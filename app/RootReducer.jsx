import { combineReducers } from 'redux';
import BudgetReducer from './budgets/BudgetReducer';
import BudgetViewReducer from './views/BudgetViewReducer';
import Message from './notifications/NotificationReducer';

export default combineReducers({
    BudgetReducer,
    BudgetViewReducer,
    Message,
});
