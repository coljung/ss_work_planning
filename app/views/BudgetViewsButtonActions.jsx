import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
import { Link } from 'react-router';
import { ROUTE_DASHBOARD } from '../Routes';
import Filter from '../components/filters/Filter';


export default class BudgetViewsButtonActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterModalActive: false,
        };
    }

    toggleFilterModal = () => {
        this.setState({
            filterModalActive: !this.state.filterModalActive,
        });
    }

    render() {
        return (
            <div className="budgetBtns">
                <Link to={ROUTE_DASHBOARD} >
                    <Button icon="arrow-left">
                        Back
                    </Button>
                </Link>
                <Popconfirm placement="top" title='Create new Budget version'
                    onConfirm={ this.props.saveNew } okText="Yes" cancelText="Cancel">
                    <Button type="primary" icon="switcher">Save New Version</Button>
                </Popconfirm>&nbsp;
                <Filter
                    visible={this.state.filterModalActive}
                    onOverlayClick={this.toggleFilterModal.bind(this)} />

                <Button icon="switcher" onClick={this.toggleFilterModal}>Filter</Button>
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
