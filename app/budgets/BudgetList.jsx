import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Modal, Spin } from 'antd';
import { fetchBudgets } from './BudgetActions';

import { ROUTE_BUDGET } from '../Routes';

class BudgetList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            season: '',
            modalActive: false,
        };
        this.restOfBudgets = '';
    }

    componentWillMount() {
        this.props.fetchBudgets();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.budgets.length !== nextProps.budgets.length) {
            this.setState({
                budgets: nextProps.budgets,
            });
        }
    }

    listItems = (versions) => {
        const list = versions.map(v =>
            <li key={v.id}>
                <Link to={`${ROUTE_BUDGET}/new`}>
                    {v.name}
                </Link>
            </li>,
        );
        return (
            <ul className="versionList">
                {list}
            </ul>
        );
    }

    enterLoading = (e) => {
        this.setState({
            modalActive: !this.state.modalActive,
        });
    }

    createList = () => {
        const stBudgets = this.state.budgets;
        // take latest 4 budgets
        const hasVersions = stBudgets.filter(e => e.versions.length);

        const recentBudgets = hasVersions.slice(0, 4).map((e) => {
            // const innerList = this.listItems(e.versions);
            return (
                <li key={e.id}>
                    <h4>
                        <Link to={`${ROUTE_BUDGET}/${e.versions[0].id}`}>
                            {e.season}{e.year}
                        </Link>
                    </h4>
                </li>
            );
        });

        this.restOfBudgets = hasVersions.slice(4).map(e =>
            <li key={e.id}>
                <h4>
                    <Link to={`${ROUTE_BUDGET}/${e.versions[0].id}`}>
                        {e.season}{e.year}
                    </Link>
                </h4>
            </li>,
        );

        return (
            <ul className="budgetList">
                {recentBudgets}
            </ul>
        );
    }

    render() {
        const budgetListData = this.props.budgetsFetched ? this.createList() : <Spin size="large" />;
        const footerButtons = (<div>
            <Button
                onClick={this.enterLoading}
                size='large'>Ok
            </Button>
        </div>);
        return (
            <div>
                { budgetListData }
                <Button icon="line-chart" onClick={this.enterLoading}>View Older Budgets</Button>
                <Modal
                    title="All Previous Budgets"
                    visible={this.state.modalActive}
                    onCancel={this.enterLoading}
                    footer={footerButtons}>

                    <ul className="budgetList">
                        { this.restOfBudgets }
                    </ul>
                </Modal>
            </div>
        );
    }
}

BudgetList.propTypes = {
    budgets: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    budgetsFetched: PropTypes.bool.isRequired,
    fetchBudgets: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { BudgetReducer } = state;
    return {
        budgets: BudgetReducer.budgets,
        budgetsFetched: BudgetReducer.budgetsFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgets }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetList);
