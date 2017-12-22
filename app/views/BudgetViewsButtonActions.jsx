import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
import { Link } from 'react-router';
import { ROUTE_DASHBOARD } from '../Routes';


export default class BudgetViewsButtonActions extends Component {

    render() {
        return (
            <div className="budgetBtns">
                <Popconfirm placement="top" title='Create new Budget version'
                    onConfirm={ this.props.saveNew } okText="Yes" cancelText="Cancel">
                    <Button icon="switcher">Save New Version</Button>
                </Popconfirm>&nbsp;

                <Button type="primary" icon="arrow-left">
                    <Link to={ROUTE_DASHBOARD} >
                        Back
                    </Link>
                </Button>
            </div>
        );
    }
}

BudgetViewsButtonActions.propTypes = {
    saveNew: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    currentView: PropTypes.string.isRequired,
};


// <Button className="undo" >Save {this.props.currentView} view</Button>
                // <Button className="undo" >Undo</Button>
                // <Button className="redo" >Redo</Button>
