import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Modal } from 'antd';
import LoadingSpinner from '../components/common/LoadingSpinner';

import { ROUTE_BUDGET } from '../Routes';

export default class BudgetList extends Component {
    constructor(props) {
        super(props);
        this.restOfBudgets = '';
    }

    orderBudgets = (a, b) => {
        if (a.year > b.year) {
            return -1;
        }

        if (a.year < b.year) {
            return 1;
        }

        return 0;
    };

    archiveBudgetList = (oldBudgets) => {
        // take rest of  4 budgets
        this.restOfBudgets = oldBudgets.slice(4).map(budget =>
            <li key={budget.id}>
                <h4>
                    <Link id={`${budget.season}-${budget.year}`} to={`${ROUTE_BUDGET}/${budget.season}${budget.year}/${budget.id}/top-down/total`}>
                        {budget.season}{budget.year}
                    </Link>
                </h4>
            </li>,
        );
    };

    recentBudgetList = (budgets) => {
        const hasVersions = budgets
          .filter(budget => budget.versions.length)
          .sort(this.orderBudgets); // sort by most recent
        // take latest 4 budgets
        // debugger;
        const recentBudgets = hasVersions.slice(0, 4).map(budget =>
            <li key={budget.id}>
                <h4 className="budgetListLink">
                    <Link id={`${budget.season}-${budget.year}`} to={`${ROUTE_BUDGET}/${budget.season}${budget.year}/${budget.id}/top-down/total`}>
                        {budget.season}{budget.year}
                    </Link>
                </h4>
            </li>,
        );

        if (hasVersions.length > 4) {
            // to create the list for the older budgets
            this.archiveBudgetList(hasVersions);
            const oldBudgetsLink = (<li key='extra'>
                    <h4 className="budgetListLink">
                        <Link onClick={this.props.onOverlayClick}>Previous Budgets</Link>
                    </h4>
                </li>);
            recentBudgets.push(oldBudgetsLink);
        }

        return recentBudgets;
    };

    createList = () => {
        const { budgets } = this.props;
        const budgetListContent = this.props.budgets.length ? this.recentBudgetList(budgets) : <p>{i18n.t('home.noAvailableBudget')}</p>;

        return (
            <ul className="budgetList">
                {budgetListContent}
            </ul>
        );
    };

    render() {
        const budgetListData = this.props.budgetsFetched ? this.createList() : <LoadingSpinner />;

        return (
            <div>
                { budgetListData }
                <Modal
                    title={i18n.t('budgetListModal.title')}
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
    budgets: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    budgetsFetched: PropTypes.bool.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};
