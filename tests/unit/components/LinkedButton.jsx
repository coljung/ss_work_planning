import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Button } from 'antd';
import LinkedButton from '../../../app/components/LinkedButton';
import { browserHistory } from 'react-router';

// Mock react-router lib
jest.mock('react-router');

describe('LinkedButton', () => {

    it('should render correctly', () => {
        const output = shallow(
            <LinkedButton title="mockTitle" to="mockUrl">Foo Bar</LinkedButton>
        );

        expect(output.find('Button').length).toBe(1);

        output.find('Button').simulate('click');

        expect(browserHistory.push).toHaveBeenCalledTimes(1);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
