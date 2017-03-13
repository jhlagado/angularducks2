import {SET_VISIBILITY_FILTER, SHOW_ALL} from './constants';

const visibilityFilter = (state = SHOW_ALL, action) => {

  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export default visibilityFilter;
