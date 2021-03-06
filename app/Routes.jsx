import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import BudgetViewsContainer from './budgets/BudgetViewsContainer';
import Home from './home/BudgetHome';
import NotFound from './components/NotFound';
import { ROUTE_BUDGET, ROUTE_DASHBOARD } from './constants/routes';

/*
const requireAuth = ((next, replace, callback) => {
    // @todo NEED TO AUTHENTICATE/AUTHORIZE HERE
    // callback();
});

const authOnEnter = ((next, replace, callback) => {
    requireAuth(next, replace, callback);
});

const authOnChange = ((prev, next, replace, callback) => {
    requireAuth(next, replace, callback);
});
*/

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path={ROUTE_DASHBOARD} component={Home} />
        <Route path={ROUTE_BUDGET}>
            <Route path=':seasonName/:budgetId/:sectionName/:tab' component={BudgetViewsContainer} />
        </Route>
        <Route path='*' component={NotFound} />
    </Route>
);
