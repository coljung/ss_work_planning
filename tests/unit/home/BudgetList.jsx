import React from 'react'
import { mount, shallow } from 'enzyme'
import { Link } from 'react-router';
import BudgetList from '../../../app/home/BudgetList';
import PreviousBudgetsModal from '../../../app/home/PreviousBudgetsModal';
import i18n from 'i18next';
import sinon from 'sinon';

describe('BudgetList', () => {
    it('Should have message when no budgets', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('home.noAvailableBudget').returns('home.noAvailableBudget');

        const output = shallow(
            <BudgetList budgets={[]}/>
        );

        expect(output.find('ul')).toHaveLength(0);
        expect(output.find('p')).toHaveLength(1);
        expect(output.find('p').text()).toEqual('home.noAvailableBudget');

        i18nStub.restore();
    });

    it('Should have budget list', () => {
        const budgets = [
            { id: 1, season: 'FW', year: 2019},
            { id: 2, season: 'FW', year: 2021},
            { id: 3, season: 'FW', year: 2020},
        ];

        const output = shallow(
            <BudgetList budgets={budgets}/>
        );

        expect(output.find('ul')).toHaveLength(1);
        expect(output.find('ul').find('li')).toHaveLength(3);
    });

    it('Should have ordered budget list', () => {
        const budgets = [
            { id: 1, season: 'FW', year: 2019},
            { id: 2, season: 'FW', year: 2020},
            { id: 3, season: 'FW', year: 2021},
        ];

        const output = mount(
            <BudgetList budgets={budgets}/>
        );

        const lis = output.find('ul').find('li');
        expect(lis.at(0).find('h4').find(Link).text()).toEqual('FW2021');
        expect(lis.at(1).find('h4').find(Link).text()).toEqual('FW2020');
        expect(lis.at(2).find('h4').find(Link).text()).toEqual('FW2019');
    });

    it('Should have links to budgets', () => {
        const budgets = [
            { id: 1, season: 'FW', year: 2019},
        ];

        const output = shallow(
            <BudgetList budgets={budgets}/>
        );

        expect(output.find(Link).prop('to')).toContain('/FW2019/1/top-down/total');
    });

    it('Should have previous budgets link when more than 4 budgets', () => {
        const budgets = [
            { id: 1, season: 'FW', year: 2020},
            { id: 2, season: 'FW', year: 2019},
            { id: 3, season: 'FW', year: 2018},
            { id: 4, season: 'FW', year: 2017},
            { id: 5, season: 'FW', year: 2016},
            { id: 6, season: 'FW', year: 2015},
        ];

        const output = shallow(
            <BudgetList budgets={budgets}/>
        );

        expect(output.find('ul').find('li')).toHaveLength(5);
        expect(output.find(PreviousBudgetsModal)).toHaveLength(1);
    });
});
