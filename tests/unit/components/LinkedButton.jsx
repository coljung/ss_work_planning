import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Button } from 'antd';
import LinkedButton from '../../../app/components/LinkedButton';

describe('LinkedButton', () => {
    it('should render correctly', () => {
        const output = shallow(
            <Button title="mockTitle" url="mockUrl" />
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
