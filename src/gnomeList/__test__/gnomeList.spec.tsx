import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GnomeList from '../gnomeList';
import store from '../../store';

configure({ adapter: new Adapter() });

const mockStore = store();

describe('PokemonList component', () => {

    it('renders as expected', () => {
        //when
        const wrapper = shallow(
            <GnomeList store={mockStore}></GnomeList>
        );
        //expect
        expect(wrapper.dive()).toMatchSnapshot();
    });
});