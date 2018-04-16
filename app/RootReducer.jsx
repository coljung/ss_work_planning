import { combineReducers } from 'redux';
import ViewReducers from 'top_down/common/ViewReducers';
import BudgetReducer from './budgets/BudgetReducer';
import BudgetViewReducer from './views/BudgetViewReducer';
import Message from './notifications/NotificationReducer';
import CustomNavigationReducer from './components/customNavigation/CustomNavigationReducer';

export default combineReducers({
    BudgetReducer,
    BudgetViewReducer,
    ViewReducers,
    Message,
    CustomNavigationReducer,
});
