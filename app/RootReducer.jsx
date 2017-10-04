import { combineReducers } from 'redux';
import TodoReducer from './todo/TodoReducer';
import Message from './notifications/NotificationReducer';

export default combineReducers({
    TodoReducer,
    Message,
});
