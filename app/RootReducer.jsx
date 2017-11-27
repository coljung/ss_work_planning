import { combineReducers } from 'redux';
import ExecViewReducer from 'top_down/exec/ExecViewReducer';
import TotalViewReducer from 'top_down/total/TotalViewReducer';
import MenViewReducer from 'top_down/men/MenViewReducer';
import WomenViewReducer from 'top_down/women/WomenViewReducer';
import BudgetReducer from './budgets/BudgetReducer';
import BudgetViewReducer from './views/BudgetViewReducer';
// import TestReducer from './views/TestReducer';
import Message from './notifications/NotificationReducer';

export default combineReducers({
    BudgetReducer,
    BudgetViewReducer,
    ExecViewReducer,
    TotalViewReducer,
    MenViewReducer,
    WomenViewReducer,
    Message,
});
