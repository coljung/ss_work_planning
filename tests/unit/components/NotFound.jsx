import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import NotFound from '../../../app/components/NotFound';

describe('NotFound', () => {
    it('should render correctly', () => {
        const output = shallow(
            <NotFound >404!</NotFound>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
