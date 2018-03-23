import { combineReducers } from 'redux';
import ExecViewReducer from 'top_down/exec/ExecViewReducer';
import ViewReducers from 'top_down/common/viewReducers';
import BudgetReducer from './budgets/BudgetReducer';
import BudgetViewReducer from './views/BudgetViewReducer';
import Message from './notifications/NotificationReducer';
import CustomNavigationReducer from './components/customNavigation/CustomNavigationReducer';

export default combineReducers({
    BudgetReducer,
    BudgetViewReducer,
    ExecViewReducer,
    ViewReducers,
    Message,
    CustomNavigationReducer,
});
