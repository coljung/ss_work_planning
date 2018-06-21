import { combineReducers } from 'redux';
import BudgetReducer from './home/BudgetReducer';
import BudgetViewReducer from './budgets/BudgetViewReducer';
import CustomNavigationReducer from './components/customNavigation/CustomNavigationReducer';
import HistoryReducer from './budgets/history/HistoryReducer';
import Message from './notifications/NotificationReducer';

export default combineReducers({
    BudgetReducer,
    BudgetViewReducer,
    CustomNavigationReducer,
    HistoryReducer,
    Message,
});
