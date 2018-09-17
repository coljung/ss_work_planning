import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import rootReducer from './rootReducer';
import clientMiddleware from './middleware/clientMiddleware';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (client, preloadedState) => {
    const enhancer = composeEnhancers(
        applyMiddleware(clientMiddleware(client)), // Api Request Middleware
        applyMiddleware(thunkMiddleware),
    );
    return createStore(
        rootReducer,
        preloadedState,
        enhancer,
    );
};

export default configureStore;
