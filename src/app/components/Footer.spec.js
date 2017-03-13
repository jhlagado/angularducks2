import { StoreService } from '../storeservice';
import { FooterComponent } from './Footer';
import { TestBed, async } from '@angular/core/testing';
import { SHOW_ALL } from '../store/Todo/constants';

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

describe('Footer component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: StoreService,
                    useClass: MockStoreService
                }
            ],
            declarations: [
                FooterComponent
            ]
        });
        TestBed.compileComponents();
    }));

    it('should render correctly', () => {
        const fixture = TestBed.createComponent(FooterComponent);
        fixture.detectChanges();
        const footer = fixture.nativeElement;
        expect(footer.querySelector('footer')).not.toBeNull();
        expect(footer.querySelector('footer').className).toBe('footer');
    });

    it('should display active count when 0', () => {
        const fixture = TestBed.createComponent(FooterComponent);
        const footer = fixture.nativeElement;
        const FooterCmp = fixture.componentInstance;
        mockState.todos = [];
        FooterCmp.__update();
        fixture.detectChanges();
        expect(footer.querySelector('.todo-count').textContent.trim()).toBe('No items left');
    });

    it('should display active count when above 0', () => {
        const fixture = TestBed.createComponent(FooterComponent);
        const footer = fixture.nativeElement;
        const FooterCmp = fixture.componentInstance;
        mockState.todos = [{ id: 1 }];
        FooterCmp.__update();
        fixture.detectChanges();
        expect(footer.querySelector('.todo-count').textContent.trim()).toBe('1 item left');
    });

    it('should call onShow when a filter is clicked', () => {
        const fixture = TestBed.createComponent(FooterComponent);
        const footer = fixture.nativeElement;
        fixture.detectChanges();
        const dispatchSpy = spyOn(mockStore, 'dispatch');
        footer.querySelectorAll('a')[1].dispatchEvent(new Event('click'));
        expect(dispatchSpy.calls.count()).toBe(1);
    });

      it('shouldnt show clear button when no completed todos', () => {
        const fixture = TestBed.createComponent(FooterComponent);
        const footer = fixture.nativeElement;
        const FooterCmp = fixture.componentInstance;
        mockState.todos = [{ id: 1, completed: false }];
        FooterCmp.__update();
        fixture.detectChanges();
        expect(footer.querySelector('.clear-completed')).toBeNull();
      });

      it('should call onClearCompleted on clear button click', () => {
        const fixture = TestBed.createComponent(FooterComponent);
        const footer = fixture.nativeElement;
        const FooterCmp = fixture.componentInstance;
        mockState.todos = [{ id: 1, completed: true }];
        FooterCmp.__update();
        fixture.detectChanges();
        const dispatchSpy = spyOn(mockStore, 'dispatch');
        footer.querySelector('.clear-completed').dispatchEvent(new Event('click'));
        expect(dispatchSpy.calls.count()).toBe(1);
      });
});
