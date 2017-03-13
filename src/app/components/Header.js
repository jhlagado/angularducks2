import {Component} from '@angular/core';
import {StoreService} from '../storeservice';
import * as actions from '../store/Todo/actions';

@Component({
  selector: 'fountain-header',
  template: require('./Header.html'),
})
export class HeaderComponent {

  static get parameters() {
    return [[StoreService]];
  }

  constructor(storeService) {
    this.store = storeService.getStore();
  }

  handleSave(text) {
    if (text.length !== 0) {
       this.store.dispatch(actions.addTodo(text));
    }
  }
}
