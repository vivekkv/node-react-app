import { combineReducers } from 'redux';
import category from './category';
import capacity from './capacity';
import contact from './contact';
import features from './features';
import images from './images';
import product from './product';
import productDetail from './product_detail';
import suitableFor from './suitableFor';
import videos from './videos';
import auth from './auth';
import landingPage from './landingPage';

export default combineReducers({
    'category': category,
    'capacity': capacity,
    'videos': videos,
    'images': images,
    'features': features,
    'product': product,
    'productDetail': productDetail,
    'suitableFor': suitableFor,
    'contact': contact,
    'auth': auth,
    'landingPage': landingPage
});