import { take, call, put, select, fork, race } from 'redux-saga/effects';
import { Map, List } from 'immutable';
import { bindInputChange } from 'reduxImplementations/reduxStateHelper';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import { alertResponse } from 'utils/notification';
import { callApi } from 'utils/request';
import { logError } from 'utils/errorLog';
import { getCategories } from 'services/category';
import { getProductList, getProductDetails } from 'services/product';
import { getMetisMenu } from 'services/category';
import { push } from 'react-router-redux';
import {
	INPUT_CHANGE, SET_FORM, LOAD_PRODUCTS, INIT_MODULE, INITALIZE, SUBMIT_ITEM, DELETE_ITEM, EDIT_ITEM, CLEAR_FORM,
	LOAD_METIS_MENU, LOAD_CATEGORY_PRODUCTS
} from 'constants/admin/product';

const getStateData = (state) => Map(state.admin.product);

function* onInputChange() {

	while (true) {

		let { type, name, value } = yield take([INPUT_CHANGE, INIT_MODULE]);
		let formData = yield select(getStateData);

		try {

			name = (type == INIT_MODULE ? INITALIZE : name);
			let callbacks = getCallbacks(formData, name, value);
			let state = yield call(bindInputChange, callbacks, name, value, false);

			yield put(reduxAction(SET_FORM, { 'data': state }));

		} catch (e) {

			logError(e);
		}
	}
}

function* loadProducts() {

	while (true) {

		const { category } = yield take(LOAD_PRODUCTS);
		let formData = yield select(getStateData);

		let productDetails = yield call(getProductDetails);
		let metisMenuResponse = yield call(getMetisMenu);
		let firstCategoryNode = getFirstCategory(metisMenuResponse.metisMenu.toArray());

		if (firstCategoryNode) {

			let to = firstCategoryNode.to.replace("/#", "");
			let categoryProductList = getCategoryProducts((category ? category : firstCategoryNode.id), productDetails.productList);

			yield put(reduxAction(SET_FORM, {
				'data': {
					'metisMenu': metisMenuResponse.metisMenu,
					'productList': productDetails.productList,
					'defaultCategory': firstCategoryNode.to,
					'categoryProductList': List(categoryProductList)
				}
			}));

		}
	}
}

function* loadCategoryProducts() {

	while (true) {

		const { categoryId } = yield take(LOAD_CATEGORY_PRODUCTS);

		let formData = yield select(getStateData);
		let defaultMenu = formData.get('defaultCategory');
		let productList = [];
		let menuList    = [];
		let categoryProducts = [];

		if(formData.get("productList").size == 0) {

			let productDetails = yield call(getProductDetails);
			productList = productDetails.productList;
			categoryProducts = getCategoryProducts(categoryId, productList);

		} else {

			productList = formData.get("productList");
			categoryProducts = getCategoryProducts(categoryId, productList);
		}

		if(formData.get("metisMenu").size == 0) {

			let metisMenuResponse = yield call(getMetisMenu);
			menuList = metisMenuResponse.metisMenu;
			defaultMenu  = getDefaultMenu(categoryId, menuList.toArray());

		} else {

			menuList = formData.get("metisMenu");
			defaultMenu  = getDefaultMenu(categoryId, menuList.toArray());
		}

		yield put(reduxAction(SET_FORM, {
			'data': {
				'metisMenu': menuList,
				'productList': productList,
				'defaultCategory': defaultMenu,
				'categoryProductList': List(categoryProducts)
			}
		}));
	}
}

function* loadMetisMenu() {

	while (true) {

		const { categoryId } = yield take(LOAD_METIS_MENU);
		let formData = yield select(getStateData);
		let menuList = [];

		if (formData.get("metisMenu").size == 0) {

			let metisMenuResponse = yield call(getMetisMenu);
			menuList = metisMenuResponse.metisMenu;

		} else {

			menuList = formData.get("metisMenu");
		}

		yield put(reduxAction(SET_FORM, {
			'data': {
				'defaultCategory': getDefaultMenu(categoryId, menuList.toArray()),
				'metisMenu': menuList,
			}
		}));
	}
}

function getDefaultMenu(categoryId, metisMenuList) {

	let menu = null;
	for (let i = 0; i < metisMenuList.length; i++) {

		let item = metisMenuList[i];

		if (item.id == categoryId) {

			menu = item.to;
			break;
		}
		else if (item.content) {

			menu = getDefaultMenu(categoryId, item.content);

			if (menu)
				break;
		}

	}

	return menu;
}

function getCategoryProducts(categoryId, productList) {

	return _.filter(productList.toArray(), (i) => { return i.category_id == categoryId });
}

function getProductInfo(id, productList) {

	return _.find(productList.toArray(), (i) => { return i.id == id });
}

function getFirstCategory(products, parent) {

	return products[0]
	let firstCategoryNode = null;

	for (let i = 0; i < products.length; i++) {

		let item = products[i];

		if (item.content && item.content.length > 0) {

			return getFirstCategory(item.content, item)
		} else {

			firstCategoryNode = item;
		}
	}

	return firstCategoryNode;
}

function* onSubmit() {

	while (true) {

		yield take(SUBMIT_ITEM);

		try {

			let formData = yield select(getStateData);

			let response = yield call(callApi, "product", {
				method: 'POST',
				body: JSON.stringify({
					'name': formData.get("name"),
					'id': formData.get("id"),
					'category_id': formData.get("category_id"),
					'description': formData.get("description"),
				}),
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			});

			if (response.completed && response.data.success) {

				yield put(reduxAction(CLEAR_FORM));

				let list = formData.get("productList").toArray();

				if (formData.get("id")) {

					let item = _.find(list, (i) => { return i.id == formData.get("id") });
					_.extend(item, response.data.data);

				} else {

					list.push(response.data.data)
				}

				yield put(reduxAction(SET_FORM, { 'data': { 'productList': List(list) } }))

			}

			alertResponse(response);

		} catch (e) {

			logError(e);
		}

	}

}

function* onEdit() {

	while (true) {

		const { id } = yield take(EDIT_ITEM);

		try {

			let formData = yield select(getStateData);
			let list = formData.get("productList").toArray();
			let item = _.find(list, (i) => { return i.id == id });

			if (item) {

				yield put(reduxAction(SET_FORM, { 'data': item }))

			} else {

				toastWarinig();
			}

		} catch (e) {

			logErrorMsg(e);
			hideLoader();
			toastWarinig();
		}
	}
}

function* onDelete() {

	while (true) {

		const { id } = yield take(DELETE_ITEM);

		try {
			let formData = yield select(getStateData);
			let response = yield call(callApi, "product", {
				method: 'DELETE',
				body: JSON.stringify({
					'id': id
				}),
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			});

			if (response.completed && response.data.success) {

				let list = formData.get("productList").toArray();
				_.remove(list, (i) => { return i.id == id });

				yield put(reduxAction(SET_FORM, { 'data': { 'productList': List(list) } }));
				yield put(reduxAction(CLEAR_FORM));
			}
		}
		catch (e) {

			logError(e)

		}
	}
}

function getCallbacks(formData, name, value) {


	switch (name) {

		case INITALIZE:

			return [getCategories, getProductList];


		default:

			return []
	}
}

export default function* sagas() {
	yield [
		fork(onInputChange),
		fork(onSubmit),
		fork(onEdit),
		fork(onDelete),
		fork(loadProducts),
		fork(loadMetisMenu),
		fork(loadCategoryProducts)
	]
}