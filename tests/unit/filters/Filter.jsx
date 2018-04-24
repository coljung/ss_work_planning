import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Button } from 'antd';
import Filter from '../../../app/components/filters/Filter';

describe('Filter', () => {
    it('should render correctly', () => {
        const output = shallow(
            <Filter title="fsdfsdf">Hello Jest!</Filter>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });

});
