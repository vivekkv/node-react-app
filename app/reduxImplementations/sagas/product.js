import { take, call, put, select, fork } from 'redux-saga/effects';
import { Map, List } from 'immutable';
import { logErrorMsg } from 'utils/errorLog';
import { request } from 'utils/request';
import { bindInputChange } from 'reduxImplementations/reduxStateHelper';
import { INPUT_CHANGE, SET_FORM, INIT_MODULE, INITALIZE, SHOW_PRODUCT } from 'reduxImplementations/constants/product';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import { reportAppBase } from 'utils/apiConfig';
import { getNavigationData } from 'services/product';

const getStateData = (state) => Map(state.product);

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

            logErrorMsg(e);
        }
    }
}
function* onShowProductInfo() {

    while (true) {

        const { product } = yield take(SHOW_PRODUCT);

        try {

            // let response = yield call(request, "/product/info/" + productId, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json;charset=UTF-8'
            //     }
            // });

            let data = {
                'category': 'Hotels and Restaurants',
                'product': {
                    'name': "Salamander",
                    'description': "SS made, heating up controlled by a symosthat, Galvanized steel gridiron and heating elements protection grill, Easy to remove crumb pan, Grindiron can be placed on 4 levels.230V 50Hz 280Watt",
                    'features': [
                        "The Drum, Motor housing, Frames are made of High Quality Stainless Steel",
                        "Detachable Cylindrical Granite Roller Stone Assembly",
                        "The Roller Stone Assembly is fitted with wiper to ensure 100% grinding in quicker time",
                        "Unique adjustable Load Balancing System provided for even spread of load and for very efficient grinding",
                        "Tilting system enables the drum to tilt and lock at 100 degree for easier and hygienic transfer of batter",
                        "Comes to you with 1 Year Warranty"
                    ],
                    "image": ["12543982001814804.jpeg"],
                    "videos": ["https://www.youtube.com/embed/_YPoftFcYAY"],
                    "catelog": ["download catelog"],
                    "capacities": "Capacities available are 5, 10, 15, 20, 30 and 40 liters.",
                    "idealfor": "Hotels and Restaurants,Bakery,Industrial Canteens,Catering Companies,Institutions,Hospital Kitchens,QSR Chains",
                    "furtherDetails": [
                        "Capacity from 30g to 800g of dough, Output upto 250 dough pieces per hour",
                        "Ideal machine which sheets every type of dough for puffs pastries, rolls etc.",
                        "Sheets all types of dough of different consistency",
                        "Provides uniform thickness in seconds",
                        "Reduces time consuming & makes production fast and easy",
                        "Table tops and floor standing models available in different belt lengths."
                    ]
                },
            }

                yield put(reduxAction(SET_FORM, { 'data': { 'productInfo': data, "selectedProduct": true }}));

        }
        catch (e) {

            logErrorMsg(e);
        }

    }
}

function getCallbacks(formData, name, value) {

    switch (name) {

        case INITALIZE:

            return [getNavigationData];

        default:
            return []
    }
}

export default function* sagas() {
    yield [
        fork(onShowProductInfo),
        fork(onInputChange)
    ]
}   