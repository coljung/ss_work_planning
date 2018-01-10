import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import RootReducer from './RootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (preloadedState) => {
    const enhancer = composeEnhancers(
        applyMiddleware(thunkMiddleware),
    );
    return createStore(
        RootReducer,
        preloadedState,
        enhancer,
    );
};

export default configureStore;
