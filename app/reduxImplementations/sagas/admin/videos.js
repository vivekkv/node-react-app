import { take, call, put, select, fork, race } from 'redux-saga/effects';
import { Map, List } from 'immutable';
import { bindInputChange } from 'reduxImplementations/reduxStateHelper';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import { alertResponse } from 'utils/notification';
import { callApi } from 'utils/request';
import { logError } from 'utils/errorLog';
import { getVideos, getAllVideos } from 'services/videos';
import { INPUT_CHANGE, SET_FORM, INIT_MODULE, INITALIZE, SUBMIT_ITEM, DELETE_ITEM, EDIT_ITEM, CLEAR_FORM,
    LOAD_PRODUCT_VIDEOS } from 'constants/admin/videos';

const getStateData = (state) => Map(state.admin.videos);
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

        const { product_id } = yield take(SUBMIT_ITEM);

        try {

            let formData = yield select(getStateData);
            let productFormData = yield select(productState);

            let fileUpload = new FormData();
			fileUpload.append("file", formData.get("VideoPath").file);

			let videoResponse = yield call(callApi, "upload", {
				method: 'POST',
				body: fileUpload,
				headers: {
					'enctype': "multipart/form-data"
				}
            })
            
            if (videoResponse.completed && videoResponse.data.success) { 

                let response = yield call(callApi, "videos", {
                    method: 'POST',
                    body: JSON.stringify({
                        'id': formData.get("id"),
                        'product_id': productFormData.get("product_id"),
                        'description': formData.get("description"),
                        'path': videoResponse.data.data.file.filename,
                    }),
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });
    
                if (response.completed && response.data.success) {
    
                    yield put(reduxAction(CLEAR_FORM));
    
                    let list = formData.get("videosList").toArray();
    
                    if (formData.get("id")) {
    
                        let item = _.find(list, (i) => { return i.id == formData.get("id") });
                        _.extend(item, response.data.data);
    
                    } else {
    
                        list.push(response.data.data)
                    }
    
                    yield put(reduxAction(SET_FORM, { 'data': { 'videosList': List(list) } }))
    
                }

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
            let list = formData.get("videosList").toArray();
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
            let response = yield call(callApi, "videos", {
                method: 'DELETE',
                body: JSON.stringify({
                    'id': id
                }),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });

            if (response.completed && response.data.success) {

                let list = formData.get("videosList").toArray();
                _.remove(list, (i) => { return i.id == id });

                yield put(reduxAction(SET_FORM, { 'data': { 'videosList': List(list) } }));
                yield put(reduxAction(CLEAR_FORM));
            }
        }
        catch (e) {

            logError(e)

        }
    }
}


function* loadVideos() {

	while(true) {

		yield take(LOAD_PRODUCT_VIDEOS);
		let videos = yield call(getAllVideos);
		yield put(reduxAction(SET_FORM, { 'data': { 'lstAllVideos': videos.lstAllVideos } }));
	}
}

function getCallbacks(formData, name, value) {

    switch (name) {

        case INITALIZE:

            return [getVideos(value)];

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
        fork(loadVideos)
    ]
}