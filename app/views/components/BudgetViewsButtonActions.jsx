import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
import { Link } from 'react-router';
import { ROUTE_DASHBOARD } from '../../Routes';
import Filter from '../../components/filters/Filter';

export default class BudgetViewsButtonActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterModalActive: false,
            undoEnabled: false,
        };
    }
    toggleFilterModal = () => {
        this.setState({
            filterModalActive: !this.state.filterModalActive,
        });
    }
    undoInput = () => {
        this.setState({
            undoEnabled: !this.state.undoEnabled,
        });
    }

    render() {
        return (
            <div className="budgetBtns">
                <Link to={ROUTE_DASHBOARD} >
                    <Button icon="arrow-left">Back</Button>
                </Link>
                <Popconfirm
                    placement="top"
                    title='Create new Budget version'
                    okText="Yes"
                    cancelText="Cancel"
                    onConfirm={ this.props.saveNew }>
                    <Button type="primary" icon="switcher">Save New Version</Button>
                </Popconfirm>&nbsp;
                <Filter
                    visible={this.state.filterModalActive}
                    onOverlayClick={this.toggleFilterModal.bind(this)} />

                <Button icon="switcher" onClick={this.toggleFilterModal}>Filter</Button>
                <Button type="primary" icon="left" onClick={this.undoInput}>Undo</Button>
            </div>
        );
    }
}

BudgetViewsButtonActions.propTypes = {
    saveNew: PropTypes.func.isRequired,
};
