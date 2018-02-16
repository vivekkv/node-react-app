import { take, call, put, select, fork, race } from 'redux-saga/effects';
import { Map, List, fromJS } from 'immutable';
import { bindInputChange } from 'reduxImplementations/reduxStateHelper';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import { alertResponse } from 'utils/notification';
import { callApi } from 'utils/request';
import { logError } from 'utils/errorLog';
import { getCategories } from 'services/category';
import { getProductList, getProductDetails, getProductInfo } from 'services/product';
import { getMetisMenu } from 'services/category';
import { LOAD_PRODUCT_DETAIL, SET_FORM, INPUT_CHANGE, INIT_MODULE, STAR_INPUT_SUBMIT, CLEAR_FORM } from 'constants/admin/productDetail';

const getStateData = (state) => Map(state.admin.productDetail);
const getProductState = (state) => Map(state.admin.product);

function* onInputChange() {

    while (true) {

        let { type, name, value } = yield take([INPUT_CHANGE, INIT_MODULE]);
        let formData = yield select(getStateData);

        try {

            name = (type == INIT_MODULE ? INITALIZE : name);
            let state = yield call(bindInputChange, [], name, value, false);

            yield put(reduxAction(SET_FORM, { 'data': state }));

        } catch (e) {

            logError(e);
        }
    }
}

function* loadProductInfo() {

    while (true) {

        const { productId, categoryId } = yield take(LOAD_PRODUCT_DETAIL);
        let productState = yield select(getProductState);
        let productInfoResponse = yield call(getProductInfo, productId);

        if (productInfoResponse.productInfo) {

            yield put(reduxAction(SET_FORM, {
                'data': {
                    'productInfo': productInfoResponse.productInfo,
                    'productId': productId
                }
            }));
        }
    }
}

function* onStarInputSubmit() {

    while (true) {

        const { nextValue } = yield take(STAR_INPUT_SUBMIT);
        let formData = yield select(getStateData);

        let response = yield call(callApi, "product/ratings", {
            method: 'POST',
            body: JSON.stringify({
                'name': formData.get("rating_user_name"),
                'email': formData.get("email"),
                'comments': formData.get("comments"),
                'productId': formData.get("productId"),
                'rating': formData.get("rating"),
                'remarks': formData.get("remarks")
            }),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });

        if (response.completed && response.data.success) {

            yield put(reduxAction(CLEAR_FORM));
            
            let productInfo = formData.get("productInfo");
            productInfo.productRating = formData.get("rating");
            let data = Object.assign({}, productInfo);

            yield put(reduxAction(SET_FORM, {
                'data': {
                    'productInfo': data
                }
            }));
        }

        alertResponse(response);
    }
}

export default function* sagas() {
    yield [
        fork(loadProductInfo),
        fork(onInputChange),
        fork(onStarInputSubmit)
    ]
}