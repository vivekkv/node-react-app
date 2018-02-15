import { fork } from 'redux-saga/effects';
import admin from './admin';

const rootSaga = function* root() {

    yield [
        fork(admin)
    ]
}  

export default rootSaga;