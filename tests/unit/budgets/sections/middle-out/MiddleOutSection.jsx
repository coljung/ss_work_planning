import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MiddleOutSection from '../../../../../app/budgets/sections/middle-out/MiddleOutSection';

describe('MiddleOutSection', () => {
    it('should render base layout', () => {
        const output = shallow(
            <MiddleOutSection title="fsdfsdf">Hello Jest!</MiddleOutSection>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
