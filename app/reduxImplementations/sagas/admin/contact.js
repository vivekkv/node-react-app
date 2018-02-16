import { take, call, put, select, fork, race } from 'redux-saga/effects';
import { Map, List } from 'immutable';
import { bindInputChange } from 'reduxImplementations/reduxStateHelper';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import { alertResponse } from 'utils/notification';
import { callApi } from 'utils/request';
import { logError } from 'utils/errorLog';
import { getCategories } from 'services/category';
import { INPUT_CHANGE, SET_FORM, INIT_MODULE, INITALIZE, SUBMIT_CONTACT, DELETE_ITEM, EDIT_ITEM, CLEAR_FORM } from 'constants/admin/contact';
import { format, log, debug } from 'util';

const getStateData = (state) => Map(state.admin.contact);

function* onInputChange() {

	while (true) {

		let { type, name, value } = yield take([INPUT_CHANGE, INIT_MODULE]);
		let formData = yield select(getStateData);

		try {

			let state = yield call(bindInputChange, [], name, value, false);
			yield put(reduxAction(SET_FORM, { 'data': state }));

		} catch (e) {

			logError(e);
		}
	}
}

function* onSubmit() {

	while (true) {

		yield take(SUBMIT_CONTACT);

		try {

			let formData = yield select(getStateData);
			let response = yield call(callApi, "contact", {
				method: 'POST',
				body: JSON.stringify({
                    'name': formData.get("name"),
                    'email': formData.get("email"),
                    'phone': formData.get("phone"),
                    'message': formData.get("message")
				}),
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			});

			if (response.completed && response.data.success) {


				yield put(reduxAction(CLEAR_FORM));
            }
            

			alert(response.data.message);

		} catch (e) {

			logError(e);
		}

	}

}

export default function* sagas() {
	yield [
		fork(onInputChange),
		fork(onSubmit)
	]
}