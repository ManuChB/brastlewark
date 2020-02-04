import { SAVE_DATA, SHOW_DETAILS, CLOSE_MODAL, SET_FILTERED_DATA} from './types';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { IGnomeProp } from '../gnome/gnome';
import { IGnomeListActions } from './gnomeList';
import { IProfessionsProp } from '../professions/professions';
import _ from 'lodash';

const actions: IGnomeListActions = {
    saveData(gnomes: Array<IGnomeProp>) {
        return {
            type: SAVE_DATA,
            payload: gnomes
        }
    },
    showGnomeDetails(gnome: IGnomeProp, friends: Array<IGnomeProp>) {
        return {
            type: SHOW_DETAILS,
            payload: {gnome, friends}
        }
    },
    closeModal() {
        return {
            type: CLOSE_MODAL
        }
    },
    setFilteredData(gnomes: Array<IGnomeProp>) {
        return {
            type: SET_FILTERED_DATA,
            payload: gnomes
        }
    }
}


export const fetchData = () => {

    return ( dispatch: Dispatch<Action<any>>) =>  {
        axios.get(
            `https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json`
        )
            .then(response => {
                dispatch(actions.saveData(response.data.Brastlewark));
                return response;
            })
            .catch(error => {
                return `[gnomeList][action][fetchData][error]>>> ${error}`;
            });
    }
}

const getProfessions = (gnomes: Array<IGnomeProp>) => {
    let profesionList: Array<string> = [];
    gnomes.forEach( gnome => {
        if(!_.isEmpty(gnome.professions)) {
            gnome.professions.forEach(profession => {
                if (!profesionList.includes(profession)) {
                    profesionList.push(profession);
                }
            })
        }
    })
}

export default actions;
