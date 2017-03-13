import { SHOW_MODAL, HIDE_MODAL } from './actions';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return [
        ...state, 
        {
          id: action.payload.id,
          modalType: action.payload.modalType,
          modalProps: action.payload.modalProps
        }
      ];
    case HIDE_MODAL:
      return state.slice(0, -1);
    default:
      return state;
  }
};

