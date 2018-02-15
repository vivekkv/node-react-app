import { take, call, put, select, fork, race } from 'redux-saga/effects';
import { Map, List } from 'immutable';
import { push } from 'react-router-redux';
import { bindInputChange } from 'reduxImplementations/reduxStateHelper';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import { alertResponse } from 'utils/notification';
import { callApi } from 'utils/request';
import { logError } from 'utils/errorLog';
import { INPUT_CHANGE, SET_FORM, INIT_MODULE, INITALIZE, LOGIN_USER, CLEAR_FORM, LOGG_OFF } from 'constants/admin/auth';
import { format, log, debug } from 'util';

const getStateData = (state) => Map(state.admin.auth);

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

function* onLogin() {

    while (true) {

        const { id } = yield take(LOGIN_USER);

        try {

            let formData = yield select(getStateData);
            let response = yield call(callApi, "users/login", {
                method: 'POST',
                body: JSON.stringify({
                    'username': formData.get('username'),
                    'password': formData.get('password')
                }),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });

            if (response.completed && response.data.success) {

                //yield put(push("/dashboard"));
                localStorage.setItem("login_user", response.data.data);
                window.location = '/admin/#/dashboard'

            } else {

                alertResponse(response);
            }

        }
        catch (e) {

            logError(e)

        }
    }
}

function* logOff() {

    while (true) {

        yield take(LOGG_OFF);

        localStorage.removeItem("login_user");
        yield put(push("/login"))
    }

}

function getCallbacks(formData, name, value) {

    switch (name) {

        case INITALIZE:

            return [getCapacities(value)];

        default:
            return []
    }
}

export default function* sagas() {
    yield [
        fork(onInputChange),
        fork(onLogin),
        fork(logOff)
    ]
}