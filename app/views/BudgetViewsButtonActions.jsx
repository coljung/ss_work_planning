import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
import { Link } from 'react-router';
import { ROUTE_DASHBOARD } from '../Routes';

const BudgetViewsButtonActions = ({ saveNew }) =>
    <div className="budgetBtns">
        <Link to={ROUTE_DASHBOARD} >
            <Button icon="arrow-left">Back</Button>
        </Link>
        <Popconfirm
            placement="top"
            title='Create new Budget version'
            okText="Yes"
            cancelText="Cancel"
            onConfirm={ saveNew }>
            <Button type="primary" icon="switcher">Save New Version</Button>
        </Popconfirm>&nbsp;

        <Button icon="switcher">Filter</Button>
    </div>
;

BudgetViewsButtonActions.propTypes = {
    saveNew: PropTypes.func.isRequired,
};

export default BudgetViewsButtonActions;

// <Button className="undo" >Save {this.props.currentView} view</Button>
                // <Button className="undo" >Undo</Button>
                // <Button className="redo" >Redo</Button>
