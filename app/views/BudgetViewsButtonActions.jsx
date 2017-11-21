import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
import { Link } from 'react-router';
import { ROUTE_DASHBOARD } from '../Routes';


export default class BudgetViewsButtonActions extends Component {

    render() {
        return (
            <div>
                <Popconfirm placement="top" title='Create new Budget version' onConfirm={ this.props.save } okText="Yes" cancelText="Cancel">
                    <Button>Save New Version</Button>
                </Popconfirm>

                <Button className="undo" >Undo</Button>
                <Button className="redo" >Redo</Button>

                <Button type="primary">
                    <Link to={ROUTE_DASHBOARD} >
                        Back
                    </Link>
                </Button>
            </div>
        );
    }
}

BudgetViewsButtonActions.propTypes = {
    save: PropTypes.func.isRequired,
};
