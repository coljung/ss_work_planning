import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TopDownSection from '../../../../../app/budgets/sections/top-down/TopDownSection';

describe('TopDownSection', () => {
    it('should render base layout', () => {
        const output = shallow(
            <TopDownSection title="fsdfsdf">Hello Jest!</TopDownSection>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
