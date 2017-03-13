import { combineReducers } from 'redux';

import todoReducer from './Todo/reducers';
import visibilityFilterReducer from './visibilityFilter/reducers';
import modalReducer from './Modal/reducers';
import authReducer from './auth/reducers';

const reducers = combineReducers({
  auth: authReducer,
  todos: todoReducer,
  visibilityFilter: visibilityFilterReducer,
  modals: modalReducer,
});

export default reducers;

