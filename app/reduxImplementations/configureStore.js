import { createStore,applyMiddleware, combineReducers,compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { routerMiddleware} from 'react-router-redux';
import { hashHistory } from 'react-router';
import CreateReducers from './reducers';

const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware, routerMiddleware(hashHistory)];
const devTools = window.devToolsExtension || (() => f => f);
const enhancers = [applyMiddleware(...middleWares)];

let initialValue = {};
let store;
let reducers = CreateReducers();

if (process.env.NODE_ENV === 'development') {

  enhancers.push(devTools());
  store = createStore(reducers, initialValue, compose(...enhancers));

} else {

  store = createStore(reducers, initialValue, compose(...enhancers));
}

sagaMiddleware.run(rootSaga).done.catch((error) => console.warn(error));

export default store;