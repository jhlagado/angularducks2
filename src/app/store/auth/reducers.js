import { LOGIN, LOGOUT } from './actions';

const initialState = {
  didLogIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log('.....logged in');
      return {
        didLogIn: true,
      };
    case LOGOUT:
      console.log('.....logged out');
      return initialState;
    default:
      return state;
  }
};

