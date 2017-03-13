import cuid from 'cuid';
import { createAction } from 'redux-actions';

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const showModal = createAction(SHOW_MODAL, (type, props, id) => {
    return {
        id: id === undefined ? cuid() : id,
        modalType: type,
        modalProps: props,
    };
});
export const hideModal = createAction(HIDE_MODAL);
export const showBasicModal = (title, message, buttons, id) =>
    showModal('BASIC_MODAL', { title, message, buttons }, id);
