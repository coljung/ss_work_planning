import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import BudgetViewsContainer from './views/BudgetViewsContainer';
import Home from './budgets/BudgetHome';
import NotFound from './components/NotFound';

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

// For testing purposes
export const ROUTE_DASHBOARD = '/home';
export const ROUTE_TODO = '/todo';
export const ROUTE_BUDGET = '/season';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path={ROUTE_DASHBOARD} component={Home} />
        <Route path={ROUTE_TODO} component={BudgetViewsContainer} />
        <Route path={ROUTE_BUDGET}>
            <Route path=':seasonname/budget/:budgetid/version/:vname/:id/:tab' component={BudgetViewsContainer} />
        </Route>
        <Route path='*' component={NotFound} />
    </Route>
);
