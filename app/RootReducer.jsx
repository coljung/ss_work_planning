import { combineReducers } from 'redux';
import BudgetReducer from './budgets/BudgetReducer';
import Message from './notifications/NotificationReducer';

export default combineReducers({
    BudgetReducer,
    Message,
});
