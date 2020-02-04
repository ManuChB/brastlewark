import { combineReducers } from 'redux';

import gnomeListReducer from './gnomeList/reducer';

export default combineReducers({
    gnomeList: gnomeListReducer
});