import { fork } from 'redux-saga/effects';
import category from './category';
import product from './product';
import features from './features';
import suitableFor from './suitableFor';
import videos from './videos';
import images from './images';
import capacity from './capacity';
import auth from './auth';
import productDetail from './productDetail';
import portfolio from './portfolio';
import contact from './contact';
import landingPage from './landingPage';

const sagas = function* root() {

    yield [
        fork(category),
        fork(product),
        fork(features),
        fork(images),
        fork(videos),
        fork(suitableFor),
        fork(capacity),
        fork(auth),
        fork(productDetail),
       // fork(portfolio),
        fork(contact),
        fork(landingPage)
    ]
}  

export default sagas;