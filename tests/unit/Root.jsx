import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import Root from '../../app/Root';

Enzyme.configure({ adapter: new Adapter() });

describe('Test the root of the app.', () => {
    it(`should mount and check.`, () => {
        const root = mount(<Root />);
        expect(root.find(Provider)).to.have.lengthOf(1);
    });
});
