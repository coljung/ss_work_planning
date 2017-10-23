import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Todo from './todo/TodoContainer';
import Home from './budgets/BudgetHome';


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

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Todo} />
        <Route path={ROUTE_DASHBOARD} component={Todo} />
    </Route>
);
