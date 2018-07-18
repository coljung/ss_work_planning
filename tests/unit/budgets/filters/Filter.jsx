import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import FilterModal from '../../../../app/budgets/filters/FilterModal';

describe('FilterModal', () => {
    it('should render correctly', () => {
        const output = shallow(
            <FilterModal title="fsdfsdf">Hello Jest!</FilterModal>
        );

        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
