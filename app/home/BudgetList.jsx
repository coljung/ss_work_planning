import i18n from 'i18next';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import PreviousBudgetsModal from './PreviousBudgetsModal';
import { ROUTE_BUDGET } from '../constants/routes';

const BudgetList = (props) => {
    const recentBudgetList = (budgets) => {
        const sortedBudgets = budgets
          .sort(() => 1); // sort by most recent

        // take latest 4 budgets
        const recentBudgets = sortedBudgets.slice(0, 4).map(budget =>
            <li key={budget.id}>
                <h4 className="budgetListLink">
                    <Link id={`${budget.season}-${budget.year}`} to={`${ROUTE_BUDGET}/${budget.season}${budget.year}/${budget.id}/top-down/total`}>
                        {budget.season}{budget.year}
                    </Link>
                </h4>
            </li>,
        );

        if (sortedBudgets.length > 4) {
            recentBudgets.push(
                <li key='previous-budgets'>
                    <PreviousBudgetsModal budgets={sortedBudgets.slice(4)} />
                </li>,
            );
        }

        return (
            <ul className="budgetList">
                { recentBudgets }
            </ul>
        );
    };

    const { budgets } = props;
    return budgets.length ? recentBudgetList(budgets) : <p>{i18n.t('home.noAvailableBudget')}</p>;
};

BudgetList.propTypes = {
    budgets: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
};

export default BudgetList;
