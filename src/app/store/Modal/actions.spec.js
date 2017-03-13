import { 
  SHOW_MODAL, 
  HIDE_MODAL, 
  showModal, 
  hideModal 
} from './actions';

describe('modal actions', () => {

  it('showModal should create SHOW_MODAL action', () => {
    expect(showModal('DELETE_POST', { postId: 42 }, 1)).toEqual({
      type: SHOW_MODAL,
      payload: {
        id: 1,
        modalType: 'DELETE_POST',
        modalProps: { 
          postId: 42 
        }
      }
    });
  });

  it('hideModal should create HIDE_MODAL action', () => {

    expect(hideModal()).toEqual({
      type: HIDE_MODAL,
    });
  });
});
