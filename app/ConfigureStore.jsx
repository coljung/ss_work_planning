import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import RootReducer from './RootReducer';

export default function configureStore(preloadedState) {
    const enhancer = compose(
        applyMiddleware(thunkMiddleware),
        devTools(),
    );
    return createStore(
        RootReducer,
        preloadedState,
        enhancer,
    );
}
