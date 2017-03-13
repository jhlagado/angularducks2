import { createSelector } from 'reselect';

const getModals = state => state.modals;

export const makeGetModals = () => {
  return createSelector(
    getModals,
    Modals => {
          return Modals;
    }
  );
};


