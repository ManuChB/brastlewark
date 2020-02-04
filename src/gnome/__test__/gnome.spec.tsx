import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Gnome} from '../gnome';

configure({
    adapter: new Adapter()
});


describe('Gnome component', () => {
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
    };

    it('renders as expected', () => {
            //when
        const wrapper = shallow(<Gnome { ...gnome } ></Gnome>);
        //expect
        expect(wrapper).toMatchSnapshot();
    });
});