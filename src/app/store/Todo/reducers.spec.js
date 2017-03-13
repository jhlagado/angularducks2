import todos from './reducers';
import { 
  completeTodo, 
  addTodo, 
  clearCompleted, 
  deleteTodo, 
  editTodo 
} from './actions';

describe('todos reducer', () => {

  const item1 = {
      text: 'Run the tests',
      completed: false,
      id: 0
  };

  const item2 = {
      text: 'Use Redux',
      completed: false,
      id: 1
  };

  const item3 = {
      text: 'Fix the tests',
      completed: false,
      id: 2
  };

  const item4 = {
      text: 'I\'m completed',
      completed: true,
      id: 3
  };

  it('should handle initial state', () => {
    const noAction = {};
    expect(todos(undefined, noAction)).toEqual([]);
  });

  it('should handle ADD_TODO', () => {

    const action1 = addTodo('Run the tests', 0);
    const action2 = addTodo('Use Redux', 1);
    const action3 = addTodo('Fix the tests', 2);

    expect(todos([], action1)).toEqual([ item1 ]);
    expect(todos([item1], action2)).toEqual([ item1, item2 ]);
    expect(todos([item1, item2], action3)).toEqual([ item1, item2, item3 ]);

  });

  it('should handle COMPLETE_TODO', () => {

    const action1 = completeTodo(1);
    const state1 = [item1, item2, item3];
    const state2 = todos(state1, action1);

    expect(state2[1].completed).toEqual(!state1[1].completed);
  });

  it('should handle DELETE_TODO', () => {

    const action1 = deleteTodo(1);
    const state1 = [item1, item2, item3];
    const state2 = todos(state1, action1);

    expect(state2.length).toEqual(2);
    expect(state2[0]).toEqual(state1[0]);
    expect(state2[1]).toEqual(state1[2]);
  });

  it('should handle EDIT_TODO', () => {

    const action1 = editTodo(0, 'FRED');
    const state1 = [item1, item2, item3];
    const state2 = todos(state1, action1);

    expect(state2[0].text).toEqual('FRED');
  });

  it('should handle CLEAR_COMPLETED', () => {

    const action1 = clearCompleted();
    const state1 = [item1, item4];
    const state2 = todos(state1, action1);

    expect(state2.length).toEqual(1);
    expect(state2[0].completed).toEqual(false);
  });

});
