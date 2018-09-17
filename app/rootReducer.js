import { combineReducers } from 'redux';
import CustomNavigationReducer from './components/customNavigation/CustomNavigationReducer';
import HistoryReducer from './budgets/history/HistoryReducer';
import Message from './notifications/NotificationReducer';
import homeReducer from './home/duck';
import budgetViewReducer from './budgets/duck';
import userReducer from './user/duck';

export default combineReducers({
    homeReducer,
    budgetViewReducer,
    userReducer,
    CustomNavigationReducer,
    HistoryReducer,
    Message,
});
