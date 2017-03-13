import {Component, Input} from '@angular/core';
import {StoreService} from '../storeservice';
import { completeTodo, deleteTodo, editTodo } from '../store/Todo/actions';

@Component({
  selector: 'fountain-todo-item',
  template: require('./TodoItem.html')
})
export class TodoItemComponent {
  
  @Input() todo;

  static get parameters() {
    return [[StoreService]];
  }

  constructor(storeService) {
    this.store = storeService.getStore();
    this.editing = false;
  }  

  handleDoubleClick() {
    this.editing = true;
  }

  handleSave(text) {
    this.store.dispatch(editTodo(this.todo.id, text));
    this.editing = false;
  }

  handleDestroy() {
    this.store.dispatch(deleteTodo(this.todo.id));
  }

  handleChange() {
    this.store.dispatch(completeTodo(this.todo.id));
  }
}
