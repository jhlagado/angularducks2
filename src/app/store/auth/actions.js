import { createAction } from 'redux-actions';
import { showBasicModal } from '../Modal/actions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);

export const showLogoutModal = () => showBasicModal('Logout', 'Do you want to logout?', [
    { id: 'ok', title: 'OK', onClick: logout },
    { id: 'cancel', title: 'Cancel' },
]);
