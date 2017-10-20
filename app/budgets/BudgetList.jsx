import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Spin } from 'antd';
import { fetchBudgets } from './BudgetActions';

import { data } from './fakeData';
import { ROUTE_BUDGET } from '../Routes';

class BudgetList extends Component {

    constructor(props) {
        super(props);
        // this.handsontableData = data;
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

    createList = () => {
        const budgetListParent = data.filter(e => e.versions.length)
            .map((e) => {
                const innerList = this.listItems(e.versions);
                return (
                    <li key={e.id}>
                        <h4>{e.name}</h4>
                        {innerList}
                    </li>
                );
            });
        return (
            <ul className="budgetList">
                {budgetListParent}
            </ul>
        );
    }

    render() {
    //     const budgetListData = data.length ? this.createList() : <Spin size="large" />;
        const budgetListData = data.length ? this.createList() : <Spin size="large" />;
        return (
            budgetListData
        );
    }
}

BudgetList.propTypes = {
    budgets: PropTypes.array.isRequired,
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
