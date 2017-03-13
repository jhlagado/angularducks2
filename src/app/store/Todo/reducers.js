import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED,
} from './constants';

const todos = (state = [], action) => {
  switch (action.type) {

    case ADD_TODO:
      return state.concat({
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      });

    case DELETE_TODO:
      return state.filter(t => t.id !== action.payload.id);

    case EDIT_TODO:
      return state.map(t => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            text: action.payload.text,
          };
        }  
        return t;
      });

    case COMPLETE_TODO:
      return state.map(t => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            completed: !t.completed
          };
        }  
        return t;
      });

    case COMPLETE_ALL: {
      const areAllMarked = state.every(t => t.completed);
      return state.map(t => {
        return {
          ...t,
          completed: !areAllMarked,
        };
      });
    }  

    case CLEAR_COMPLETED:
      return state.filter(t => t.completed === false);

    default:
      return state;
  }
};

export default todos; 
