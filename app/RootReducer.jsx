import { combineReducers } from 'redux';
import BudgetViewReducer from './budgets/BudgetViewReducer';
import CustomNavigationReducer from './components/customNavigation/CustomNavigationReducer';
import HistoryReducer from './budgets/history/HistoryReducer';
import Message from './notifications/NotificationReducer';
import homeReducer from './home/duck';

export default combineReducers({
    homeReducer,
    BudgetViewReducer,
    CustomNavigationReducer,
    HistoryReducer,
    Message,
});
