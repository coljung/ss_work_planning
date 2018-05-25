import { combineReducers } from 'redux';
import SectionReducers from './budgets/sections/SectionReducers';
import BudgetReducer from './home/BudgetReducer';
import BudgetViewReducer from './budgets/BudgetViewReducer';
import HistoryReducer from './budgets/history/HistoryReducer';
import Message from './notifications/NotificationReducer';
import CustomNavigationReducer from './components/customNavigation/CustomNavigationReducer';

export default combineReducers({
    BudgetReducer,
    BudgetViewReducer,
    HistoryReducer,
    SectionReducers,
    Message,
    CustomNavigationReducer,
});
