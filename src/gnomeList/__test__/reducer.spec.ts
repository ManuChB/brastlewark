import action from '../actions';
import reducer from '../reducer';

describe('GnomeList reducer', () => {
    const defaultState = {
        text: '',
        data: [],
        showModal: false,
        gnomeDetails: undefined,
        gnomeDetailsFriends: [],
        filteredData: []
    };

    const gnome = {
        id: 1,
        name: 'name',
        thumbnail: 'image',
        age: 100,
        weight: 100,
        height: 100,
        hair_color: 'red',
        professions: [],
        friends: [],
        onPress: jest.fn()
    }
    const gnomeList = [gnome]

    it('handle saveData()', () => {
        expect(reducer(defaultState, action.saveData(gnomeList))).toMatchSnapshot();
    });

    it('handle showGnomeDetails()', () => {
        expect(reducer(defaultState, action.showGnomeDetails(gnome, gnomeList))).toMatchSnapshot();
    });

    it('handle closeModal()', () => {
        expect(reducer(defaultState, action.closeModal())).toMatchSnapshot();
    });

    it('handle setFilteredData()', () => {
        const loading = false;
        expect(reducer(defaultState, action.setFilteredData(gnomeList))).toMatchSnapshot();
    });

});
