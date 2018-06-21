import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Button } from 'antd';
import Filter from '../../../../app/budgets/filters/Filter';

describe('Filter', () => {
    it.skip('should render correctly', () => {
        const output = shallow(
            <Filter title="fsdfsdf">Hello Jest!</Filter>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });

});
