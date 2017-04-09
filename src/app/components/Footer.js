import { Component } from '@angular/core';
import { StoreService } from '../storeservice';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../store/visibilityFilter/constants';
import { clearCompleted } from '../store/Todo/actions';
import { setVisibilityFilter } from '../store/visibilityFilter/actions';

@Component({
  selector: 'fountain-footer',
  template: require('./Footer.html'),
  styles: [`
    a {
      cursor:  pointer
    }
  `]
})
export class FooterComponent {

  static get parameters() {
    return [[StoreService]];
  }

  constructor(storeService) {
    this.store = storeService.getStore();
    this.filters = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED];
    this.filterTitles = {
      [SHOW_ALL]: 'All',
      [SHOW_ACTIVE]: 'Active',
      [SHOW_COMPLETED]: 'Completed'
    };

    const update = () => {
      const state = this.store.getState();
      this.filter = state.visibilityFilter;

      const todos = state.todos;
      this.completedCount = todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0);
      this.activeCount = todos.length - this.completedCount;
    };

    this.store.subscribe(update);
    update();
    this.__update = update; // for unit testing
  }

  completedCount = 0;
  activeCount = 0;

  handleClear() {
    this.store.dispatch(clearCompleted());
  }

  handleChange(filter) {
    this.store.dispatch(setVisibilityFilter(filter));
  }
}
