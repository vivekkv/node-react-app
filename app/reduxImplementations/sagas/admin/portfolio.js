import { take, call, put, select, fork, race } from 'redux-saga/effects';
import { Map, List } from 'immutable';
import { bindInputChange } from 'reduxImplementations/reduxStateHelper';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import { alertResponse } from 'utils/notification';
import { callApi } from 'utils/request';
import { logError } from 'utils/errorLog';
import { getPortfolio } from 'services/product';
import { INPUT_CHANGE, SET_FORM, INIT_MODULE, INITALIZE, SUBMIT_ITEM, DELETE_ITEM, EDIT_ITEM, CLEAR_FORM } from 'constants/admin/images';
import { format, log, debug } from 'util';

const getStateData = (state) => Map(state.admin.portfolio);

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

function getCallbacks(formData, name, value) {

	switch (name) {

		case INITALIZE:
			return [getPortfolio];

		default:
			return []
	}
}

export default function* sagas() {
	yield [
		fork(onInputChange)
	]
}