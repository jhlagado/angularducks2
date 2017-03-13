import { setVisibilityFilter } from './actions';
import { SHOW_ALL, SHOW_ACTIVE } from './constants';

import visibilityFilter from './reducers';

describe('visibilityFilter reducer', () => {

  it('should handle initial state', () => {
    const noAction = {};
    expect(visibilityFilter(undefined, noAction)).toEqual(SHOW_ALL);
    expect(visibilityFilter(SHOW_ACTIVE, noAction)).toEqual(SHOW_ACTIVE);
  });

  it('should handle SET_VISIBILITY_FILTER', () => {
    const state = visibilityFilter(undefined, setVisibilityFilter(SHOW_ACTIVE)); 
    expect(state).toEqual(SHOW_ACTIVE);
  });

});
