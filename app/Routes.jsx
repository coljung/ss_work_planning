import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './budgets/BudgetHome';
import Test from './budgets/BudgetTest';


const requireAuth = ((next, replace, callback) => {
    // @todo NEED TO AUTHENTICATE/AUTHORIZE HERE
    callback();
});

const authOnEnter = ((next, replace, callback) => {
    requireAuth(next, replace, callback);
});

const authOnChange = ((prev, next, replace, callback) => {
    requireAuth(next, replace, callback);
});

// For testing purposes
export const ROUTE_DASHBOARD = '/home';
export const ROUTE_BUDGET = '/budget';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path={ROUTE_DASHBOARD} component={Home} />
        <Route path={ROUTE_BUDGET}>
            <Route path=':id' component={Test} />
        </Route>
    </Route>
);
