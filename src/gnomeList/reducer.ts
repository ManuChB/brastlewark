import {
    SAVE_DATA,
    SHOW_DETAILS,
    CLOSE_MODAL,
    SET_FILTERED_DATA
} from './types';
import { IGnomeListState } from './gnomeList';
import { Action } from 'redux';

const defaultState = {
    text: '',
    data: [],
    showModal: false,
    gnomeDetails: undefined,
    gnomeDetailsFriends: [],
    filteredData: []
};

const formReducer = (state: IGnomeListState = defaultState, action: {type: string, payload?: any}) => {
    switch (action.type) {
        case SAVE_DATA:
            return {
                ...state,
                data: action.payload
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
        default:
            return state;
    }
};

export default formReducer;