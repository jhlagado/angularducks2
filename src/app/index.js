import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {routing, RootComponent} from './routes';
// import {store} from './store';

import {AppComponent} from './containers/App';
import {FooterComponent} from './components/Footer';
import {HeaderComponent} from './components/Header';
import {MainSectionComponent} from './components/MainSection';
import {TodoItemComponent} from './components/TodoItem';
import {TodoTextInputComponent} from './components/TodoTextInput';

import {StoreService} from './storeservice';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
  ],
  declarations: [
    RootComponent,
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainSectionComponent,
    TodoItemComponent,
    TodoTextInputComponent
  ],
  providers: [
    StoreService,
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
