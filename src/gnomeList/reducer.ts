import {
    SAVE_DATA,
    SHOW_DETAILS,
    CLOSE_MODAL,
    SET_FILTERED_DATA,
    SET_ACTIVE_PAGE,
    SET_DATA_TO_SHOW
} from './types';
import { IGnomeListState } from './gnomeList';
import { Action } from 'redux';

const defaultState = {
    text: '',
    rawData: [],
    dataToShow: [],
    showModal: false,
    gnomeDetails: undefined,
    gnomeDetailsFriends: [],
    filteredData: [],
    activePage: 1
};

const formReducer = (state: IGnomeListState = defaultState, action: {type: string, payload?: any}) => {
    switch (action.type) {
        case SAVE_DATA:
            return {
                ...state,
                dataToShow: action.payload.slice(0,  20),
                rawData: action.payload
            };
        case SHOW_DETAILS:
            return {
                ...state,
                showModal: true,
                gnomeDetails: action.payload.gnome,
                gnomeDetailsFriends: action.payload.friends
            };
        case CLOSE_MODAL:
            return {
                ...state,
                showModal: false
            };

        case SET_FILTERED_DATA:
            return {
                ...state,
                filteredData: action.payload
            };

        case SET_ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.payload
            };

        case SET_DATA_TO_SHOW:
            return {
                ...state,
                dataToShow: action.payload
            };

        default:
            return state;
    }
};

export default formReducer;