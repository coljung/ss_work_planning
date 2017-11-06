import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
import { Link } from 'react-router';
import { ROUTE_DASHBOARD } from '../Routes';

export default class BudgetViewsButtonActions extends Component {

    render() {
        return (
            <div>
                <Button type="primary" size="large">
                    <Link to={ROUTE_DASHBOARD} >
                        Back to Dashboard
                    </Link>
                </Button>
                <Popconfirm placement="top" title='Create new Budget version' onConfirm={ this.props.save } okText="Yes" cancelText="Cancel">
                    <Button size='large'>Save New Version</Button>
                </Popconfirm>
            </div>

        );
    }
}

BudgetViewsButtonActions.propTypes = {
    save: PropTypes.func.isRequired,
};
