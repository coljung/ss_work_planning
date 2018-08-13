import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import { Button } from 'antd';
import BudgetViewsButtonActions from '../../../app/budgets/BudgetViewActionsBar';

describe('BudgetViewActionsBar', () => {
    it('Should pass children in props', () => {
        const output = shallow(
            <BudgetViewsButtonActions
                onBack='home'
                onUndo={jest.fn()}
                onRedo={jest.fn()}
                onExport={jest.fn()}>
                <Button icon='up' />
            </BudgetViewsButtonActions>
        );

        const button = output.find(Button);
        expect(button.at(1).prop('icon')).toEqual('up');
    });

    describe('back button', () => {
        it('Should have back button', () => {
            const onBack = "home";

            const output = shallow(
                <BudgetViewsButtonActions
                    onBack={onBack}
                    onUndo={jest.fn()}
                    onRedo={jest.fn()}
                    onExport={jest.fn()} />
            );

            const link = output.find(Link).first();
            expect(link.prop('to')).toEqual(onBack);

            const button = link.find(Button);
            expect(button.at(0).prop('icon')).toEqual('arrow-left');
        });
    });

    describe('undo button', () => {
        it('Should have undo button', () => {
            const onUndo = jest.fn();

            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={onUndo}
                    onRedo={jest.fn()}
                    onExport={jest.fn()} />
            );

            const button = output.find(Button);
            expect(button.at(1).prop('icon')).toEqual('left');
            expect(button.at(1).prop('onClick')).toEqual(onUndo);
        });

        it('Should disable undo button on loading', () => {
            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={jest.fn()}
                    onExport={jest.fn()}
                    viewHistory={{ past: [{}], future: [] }}
                    isLoading={true} />
            );

            const button = output.find(Button);
            expect(button.at(1).prop('disabled')).toEqual(true);
        });

        it('Should disable undo button when null history', () => {
            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={jest.fn()}
                    onExport={jest.fn()}
                    viewHistory={null} />
            );

            const button = output.find(Button);
            expect(button.at(1).prop('disabled')).toEqual(true);
        });

        it('Should disable undo button when no past history', () => {
            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={jest.fn()}
                    onExport={jest.fn()}
                    viewHistory={{ past: [], future: [] }} />
            );

            const button = output.find(Button);
            expect(button.at(1).prop('disabled')).toEqual(true);
        });

        it('Should enable undo button when history and not loading', () => {
            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={jest.fn()}
                    onExport={jest.fn()}
                    viewHistory={{ past: [{}], future: [] }}
                    isLoading={false} />
            );

            const button = output.find(Button);
            expect(button.at(1).prop('disabled')).toEqual(false);
        });

        it('Should execute undo callback', () => {
            const onUndo = jest.fn();

            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={onUndo}
                    onRedo={jest.fn()}
                    onExport={jest.fn()} />
            );

            output.find(Button).at(1).simulate('click');

            expect(onUndo).toHaveBeenCalledTimes(1);
        });
    });

    describe('redo button', () => {
        it('Should have redo button', () => {
            const onRedo = jest.fn();

            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={onRedo}
                    onExport={jest.fn()} />
            );

            const button = output.find(Button);
            expect(button.at(2).prop('icon')).toEqual('right');
            expect(button.at(2).prop('onClick')).toEqual(onRedo);
        });

        it('Should disable redo button on loading', () => {
            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={jest.fn()}
                    onExport={jest.fn()}
                    viewHistory={{ past: [], future: [{}] }}
                    isLoading={true} />
            );

            const button = output.find(Button);
            expect(button.at(2).prop('disabled')).toEqual(true);
        });

        it('Should disable redo button when null history', () => {
            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={jest.fn()}
                    onExport={jest.fn()}
                    viewHistory={null} />
            );

            const button = output.find(Button);
            expect(button.at(2).prop('disabled')).toEqual(true);
        });

        it('Should disable redo button when no future history', () => {
            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={jest.fn()}
                    onExport={jest.fn()}
                    viewHistory={{ past: [], future: [] }} />
            );

            const button = output.find(Button);
            expect(button.at(2).prop('disabled')).toEqual(true);
        });

        it('Should enable redo button when history and not loading', () => {
            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={jest.fn()}
                    onExport={jest.fn()}
                    viewHistory={{ past: [], future: [{}] }}
                    isLoading={false} />
            );

            const button = output.find(Button);
            expect(button.at(2).prop('disabled')).toEqual(false);
        });

        it('Should execute redo callback', () => {
            const onRedo = jest.fn();

            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={onRedo}
                    onExport={jest.fn()} />
            );

            output.find(Button).at(2).simulate('click');

            expect(onRedo).toHaveBeenCalledTimes(1);
        });
    });

    describe('export button', () => {
        it('Should have export button', () => {
            const onExport = jest.fn();

            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={jest.fn()}
                    onExport={onExport} />
            );

            const button = output.find(Button);
            expect(button.at(3).prop('icon')).toEqual('export');
            expect(button.at(3).prop('onClick')).toEqual(onExport);
        });

        it('Should disable redo button on loading', () => {
            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={jest.fn()}
                    onExport={jest.fn()}
                    isLoading={true} />
            );

            const button = output.find(Button);
            expect(button.at(3).prop('disabled')).toEqual(true);
        });

        it('Should enable export button when not loading', () => {
            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={jest.fn()}
                    onExport={jest.fn()}
                    isLoading={false} />
            );

            const button = output.find(Button);
            expect(button.at(3).prop('disabled')).toEqual(false);
        });

        it('Should execute export callback', () => {
            const onExport = jest.fn();

            const output = shallow(
                <BudgetViewsButtonActions
                    onBack='home'
                    onUndo={jest.fn()}
                    onRedo={jest.fn()}
                    onExport={onExport} />
            );

            output.find(Button).at(3).simulate('click');

            expect(onExport).toHaveBeenCalledTimes(1);
        });
    });
});
