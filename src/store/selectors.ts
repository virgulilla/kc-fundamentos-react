import type { RootState } from ".";

export const hasLogged = (state: RootState) => state.auth;

export const getAdverts = (state: RootState) => state.adverts;

export function getAdvert(id: string) {
  return function (state: RootState) {
    return state.adverts?.find((advert) => advert.id === id);
  };
}

export const getUi = (state: RootState) => state.ui;
