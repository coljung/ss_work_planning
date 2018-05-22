import { combineReducers } from 'redux';
import SectionReducers from './views/sections/SectionReducers';
import BudgetReducer from './budgets/BudgetReducer';
import BudgetViewReducer from './views/BudgetViewReducer';
import HistoryReducer from './views/history/HistoryReducer';
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
