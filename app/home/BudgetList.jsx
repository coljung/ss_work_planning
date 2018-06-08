import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Modal, Spin, Row, Col } from 'antd';
import { fetchBudgets } from './BudgetActions';
import PopoverBudgetLink from './PopoverBudgetLink';
import LoadingSpinner from '../components/common/LoadingSpinner';

import { ROUTE_BUDGET } from '../Routes';

class BudgetList extends Component {

    constructor(props) {
        super(props);
        this.restOfBudgets = '';
    }

    componentWillMount() {
        this.props.fetchBudgets();
    }

    orderBudgets = (a, b) => {
        if (a.year > b.year) {
            return -1;
        }

        if (a.year < b.year) {
            return 1;
        }

        return 0;
    }
    archiveBudgetList = (oldBudgets) => {
        // take rest of  4 budgets
        this.restOfBudgets = oldBudgets.slice(4).map(budget =>
            <li key={budget.id}>
                <h4>
                    <Link id={`${budget.season}-${budget.year}`} to={`${ROUTE_BUDGET}/${budget.season}${budget.year}/${budget.id}/version/${budget.versions[0].name}/${budget.versions[0].id}/top-down/women`}>
                        {budget.season}{budget.year}
                    </Link>
                </h4>
            </li>,
        );
    }
    recentBudgetList = (budgets) => {
        const hasVersions = budgets
          .filter(budget => budget.versions.length)
          .sort(this.orderBudgets); // sort by most recent
        // take latest 4 budgets
        const recentBudgets = hasVersions.slice(0, 4).map(budget =>
            <li key={budget.id}>
                <h4 className="budgetListLink">
                    <PopoverBudgetLink
                        budgetId={budget.id}
                        seasonName={`${budget.season}${budget.year}`}
                        versionId={budget.versions[0].id}
                        versionName={budget.versions[0].name} />
                </h4>
            </li>,
        );
        // to create the list for the older budgets
        this.archiveBudgetList(hasVersions);
        return recentBudgets;
    }
    createList = () => {
        const { budgets } = this.props;
        const budgetListContent = this.props.budgets.length ? this.recentBudgetList(budgets) : <p>No budgets were created previously</p>;
        return (
            <ul className="budgetList">
                {budgetListContent}
            </ul>
        );
    }

    render() {
        const budgetListData = this.props.budgetsFetched ? this.createList() : <LoadingSpinner />;

        return (
            <div>
                { budgetListData }
                <Modal
                    title="All Previous Budgets"
                    visible={this.props.visible}
                    onCancel={this.props.onOverlayClick}
                    footer={null}>

                    <ul className="budgetList">
                        { this.restOfBudgets }
                    </ul>
                </Modal>
            </div>
        );
    }
}

BudgetList.propTypes = {
    visible: PropTypes.bool.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
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
