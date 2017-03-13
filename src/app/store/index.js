import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import SHOW_ALL from './visibilityFilter/constants';
import rootReducer from './reducers';

const initialState = {
  todos: [{
    text: 'Use AngularJS',
    completed: false,
    id: 0
  }],
  visibilityFilter: SHOW_ALL,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer, initialState,
  composeEnhancers(applyMiddleware(thunk))
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextReducer = rootReducer;
    store.replaceReducer(nextReducer);
  });
}

export default store;
