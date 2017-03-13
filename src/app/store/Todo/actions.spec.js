import { ADD_TODO, COMPLETE_TODO } from './constants';
import { completeTodo, addTodo } from './actions';

describe('todo actions', () => {

  it('addTodo should create ADD_TODO action', () => {
    expect(addTodo('Use Redux', 1)).toEqual({
      type: ADD_TODO,
      payload: {
        id: 1,
        text: 'Use Redux'
      }
    });
  });

  it('completeTodo should create COMPLETE_TODO action', () => {
    
    expect(completeTodo(1)).toEqual({
      type: COMPLETE_TODO,
      payload: {
        id: 1
      }
    });
  });
});
