import {Component} from '@angular/core';
import {StoreService} from '../storeservice';
import { completeAll } from '../store/Todo/actions';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../store/visibilityFilter/constants';

@Component({
  selector: 'fountain-main-section',
  template: require('./MainSection.html')
})
export class MainSectionComponent {

  static get parameters() {
    return [[StoreService]];
  }

  constructor(storeService) {
    this.store = storeService.getStore();
    this.completedCount = 0;
    this.filters = {
      [SHOW_ALL]: () => true,
      [SHOW_COMPLETED]: todo => todo.completed,
      [SHOW_ACTIVE]: todo => !todo.completed,
    };
    
    const update = () => {
      const state = this.store.getState();
      const filter = state.visibilityFilter;
      this.todos = state.todos;
      this.completedCount = this.todos.reduce((count, todo) =>
        todo.completed ? count + 1 : count,
        0
      );
      this.filteredTodos = this.todos.filter(this.filters[filter]);
    };

    this.store.subscribe(() => update());
    update();
    this.__update = update; 
  }

  handleCompleteAll() {
    this.store.dispatch(completeAll());
  }

}
