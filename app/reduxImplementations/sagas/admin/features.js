import { take, call, put, select, fork, race } from 'redux-saga/effects';
import { Map, List } from 'immutable';
import { bindInputChange } from 'reduxImplementations/reduxStateHelper';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import { alertResponse } from 'utils/notification';
import { callApi } from 'utils/request';
import { logError } from 'utils/errorLog';
import { getFeatures } from 'services/features';
import { INPUT_CHANGE, SET_FORM, INIT_MODULE, INITALIZE, SUBMIT_ITEM, DELETE_ITEM, EDIT_ITEM, CLEAR_FORM } from 'constants/admin/features';
import { format, log, debug } from 'util';

const getStateData = (state) => Map(state.admin.features);
const productState = (state) => Map(state.admin.product);

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

function* onSubmit() {

	while (true) {

		yield take(SUBMIT_ITEM);

		try {

            let formData = yield select(getStateData);
            let productFormData = yield select(productState);

			let response = yield call(callApi, "features", {
				method: 'POST',
				body: JSON.stringify({
					'id': formData.get("id"),
					'product_id': productFormData.get("product_id"),
					'description': formData.get("description"),
				}),
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			});

			if (response.completed && response.data.success) {

				yield put(reduxAction(CLEAR_FORM));

				let list = formData.get("featuresList").toArray();

				if (formData.get("id")) {

					let item = _.find(list, (i) => { return i.id == formData.get("id") });
					_.extend(item, response.data.data);

				} else {

					list.push(response.data.data)
				}

				yield put(reduxAction(SET_FORM, { 'data': { 'featuresList': List(list) } }))

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
			let list = formData.get("featuresList").toArray();
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
			let response = yield call(callApi, "features", {
				method: 'DELETE',
				body: JSON.stringify({
					'id': id
				}),
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			});

			if (response.completed && response.data.success) {

				let list = formData.get("featuresList").toArray();
				_.remove(list, (i) => { return i.id == id });

				yield put(reduxAction(SET_FORM, { 'data': { 'featuresList': List(list) } }));
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

			return [getFeatures(value)];

		default:
			return []
	}
}

export default function* sagas() {
	yield [
		fork(onInputChange),
		fork(onSubmit),
		fork(onEdit),
		fork(onDelete)
	]
}