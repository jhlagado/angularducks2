import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './containers/App';

@Component({
  selector: 'fountain-root',
  template: '<router-outlet></router-outlet>'
})
export class RootComponent {}

export const routes = [
  {
    path: '',
    component: AppComponent
  }
];

export const routing = RouterModule.forRoot(routes);
