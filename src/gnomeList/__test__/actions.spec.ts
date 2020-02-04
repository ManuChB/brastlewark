import actions from '../actions';

describe('Actions', () => {
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

    it('saveData() should return action', () => {
        expect(actions.saveData(gnomeList)).toMatchSnapshot();
    });
    it('showGnomeDetails() should return action', () => {
        expect(actions.showGnomeDetails(gnome, gnomeList)).toMatchSnapshot();
    });
    it('closeModal() should return action', () => {
        expect(actions.closeModal()).toMatchSnapshot();
    });
    it('setFilteredData() should return action', () => {
        expect(actions.setFilteredData(gnomeList)).toMatchSnapshot();
    });
});
