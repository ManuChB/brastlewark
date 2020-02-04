import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GnomeDetails from '../gnomeDetail';

configure({
    adapter: new Adapter()
});


describe('Gnome detail component', () => {
    const gnomeDetails = {
        gnome: {
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
        },
        friendsDetails: [],
        onFriendPress: jest.fn()
    };

    it('renders as expected', () => {
        //when
        const wrapper = shallow(<GnomeDetails {...gnomeDetails} ></GnomeDetails>);
        //expect
        expect(wrapper).toMatchSnapshot();
    });
});