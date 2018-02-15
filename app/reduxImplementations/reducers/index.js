import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';
import admin from './admin';

export default () => {
    return combineReducers({
        'routing': routerReducer,
        'app': app,
        'admin': admin
    })
}