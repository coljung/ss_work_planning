import { combineReducers } from 'redux';
import SectionReducers from './views/sections/SectionReducers';
import BudgetReducer from './budgets/BudgetReducer';
import BudgetViewReducer from './views/BudgetViewReducer';
import Message from './notifications/NotificationReducer';
import CustomNavigationReducer from './components/customNavigation/CustomNavigationReducer';

export default combineReducers({
    BudgetReducer,
    BudgetViewReducer,
    SectionReducers,
    Message,
    CustomNavigationReducer,
});
