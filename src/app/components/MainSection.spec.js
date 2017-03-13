import { StoreService } from '../storeservice';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MainSectionComponent } from './MainSection';
import { TodoItemComponent } from './TodoItem';
import { TodoTextInputComponent } from './TodoTextInput';
import { FooterComponent } from './Footer';
import { SHOW_ALL, SHOW_COMPLETED } from '../store/visibilityFilter/constants';

const mockState = {
    todos: [],
    visibilityFilter: SHOW_ALL,
};

const mockStore = {
    dispatch: () => { },
    subscribe: () => { },
    getState: () => {
        return mockState;
    },
};

class MockStoreService {
    getStore() {
        return mockStore;
    }
}

@Component({
    selector: 'fountain-todo-item',
    template: ''
})
class MockTodoItemComponent {
    @Input() todo;
}

@Component({
    selector: 'fountain-footer',
    template: ''
})
class MockFooterComponent {
    @Input() completedCount;
    @Input() activeCount;
    @Input() filter;
    @Output() onClearCompleted = new EventEmitter(false);
    @Output() onShow = new EventEmitter(false);
}

// const store = StoreModule.provideStore(combineReducers({todos, visibility}), {});

describe('MainSection component', () => {
    describe('mocked', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                providers: [
                    {
                        provide: StoreService,
                        useClass: MockStoreService
                    }
                ],
                declarations: [
                    MainSectionComponent,
                    MockTodoItemComponent,
                    MockFooterComponent
                ]
            });
            TestBed.compileComponents();
        }));

        it('should render container', () => {
            const fixture = TestBed.createComponent(MainSectionComponent);
            fixture.detectChanges();
            const main = fixture.nativeElement;
            expect(main.querySelector('section')).not.toBeNull();
            expect(main.querySelector('section').className).toBe('main');
        });

        describe('toggle all input', () => {
            it('should render', () => {
                mockState.todos = [{ id: 0, completed: false }];
                const fixture = TestBed.createComponent(MainSectionComponent);
                fixture.detectChanges();
                const main = fixture.nativeElement;
                const input = main.querySelector('input');
                expect(input).not.toBeNull();
                expect(input.type).toBe('checkbox');
                expect(input.checked).toBe(false);
            });

            it('should be checked if all todos completed', () => {
                mockState.todos = [
                    { id: 0, completed: true },
                    { id: 1, completed: true }
                ];
                const fixture = TestBed.createComponent(MainSectionComponent);
                const MainCmp = fixture.componentInstance;
                MainCmp.__update();
                fixture.detectChanges();
                const main = fixture.nativeElement;
                const input = main.querySelector('input');
                expect(input.checked).toBe(true);
            });

            it('should call completeAll on change', () => {
                const fixture = TestBed.createComponent(MainSectionComponent);
                fixture.detectChanges();
                const input = fixture.nativeElement.querySelector('input');
                const evt = new CustomEvent('click');
                const dispatchSpy = spyOn(mockStore, 'dispatch');
                input.dispatchEvent(evt);
                expect(dispatchSpy.calls.count()).toBe(1);
            });
        });

        describe('footer', () => {
            beforeEach(async(() => {
                TestBed.configureTestingModule({
                    providers: [
                        {
                            provide: StoreService,
                            useClass: MockStoreService
                        }
                    ],
                    declarations: [
                        MainSectionComponent,
                        MockTodoItemComponent,
                        FooterComponent
                    ]
                });
                TestBed.compileComponents();
            }));

            it('should render', () => {
                mockState.todos = [{ id: 0, completed: false }];
                const fixture = TestBed.createComponent(MainSectionComponent);
                const MainCmp = fixture.componentInstance;
                MainCmp.__update();
                fixture.detectChanges();
                const main = fixture.nativeElement;
                const footer = main.querySelector('fountain-footer');
                expect(footer).not.toBeNull();
            });

        });

        describe('todo list', () => {
            beforeEach(async(() => {
                TestBed.configureTestingModule({
                    providers: [
                        {
                            provide: StoreService,
                            useClass: MockStoreService
                        }
                    ],
                    declarations: [
                        MainSectionComponent,
                        TodoItemComponent,
                        TodoTextInputComponent,
                        MockFooterComponent
                    ]
                });
                TestBed.compileComponents();
            }));

            it('should render', () => {
                mockState.todos = [
                    { id: 0, completed: true },
                    { id: 1, completed: false }
                ];
                const fixture = TestBed.createComponent(MainSectionComponent);
                const MainCmp = fixture.componentInstance;
                MainCmp.__update();
                fixture.detectChanges();
                const ul = fixture.nativeElement.querySelector('ul');
                expect(ul).not.toBeNull();
                const todoitems = fixture.debugElement.queryAllNodes(By.css('fountain-todo-item'));
                expect(todoitems.length).toBe(2);
                todoitems.forEach((item, i) => {
                    expect(item.name).toBe('fountain-todo-item');
                    expect(item.componentInstance.todo).toBe(mockState.todos[i]);
                });
            });

            it('should filter items', () => {
                mockState.todos = [
                    { id: 0, completed: false },
                    { id: 1, completed: true }
                ];
                mockState.visibilityFilter = SHOW_COMPLETED;
                const fixture = TestBed.createComponent(MainSectionComponent);
                const MainCmp = fixture.componentInstance;
                MainCmp.__update();
                fixture.detectChanges();
                const ul = fixture.nativeElement.querySelector('ul');
                expect(ul).not.toBeNull();
                const todoitems = fixture.debugElement.queryAllNodes(By.css('fountain-todo-item'));
                expect(todoitems.length).toBe(1);
                expect(todoitems[0].componentInstance.todo).toBe(mockState.todos[1]);
            });
          });
    });
});
