import type { AppThunk } from ".";
import { login } from "../pages/auth/service";
import type { Credentials } from "../pages/auth/types";
import { newAdvert, getAdverts, getAdvert } from "../pages/advert/service";
import type { Advert } from "../pages/advert/types";

type AuthLoginPending = {
  type: "auth/login/pending";
};

type AuthLoginFulfilled = {
  type: "auth/login/fulfilled";
};

type AuthLoginRejected = {
  type: "auth/login/rejected";
  payload: Error;
};

type AuthLogout = {
  type: "auth/logout";
};

type AdvertsLoadedFulfilled = {
  type: "adverts/loaded/fulfilled";
  payload: Advert[];
};

type AdvertsCreatedFulFilled = {
  type: "adverts/created/fulfilled";
  payload: Advert;
};

type UiResetError = {
  type: "ui/reset-error";
};

export const AuthLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

export const AuthLoginRejected = (error: Error): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});

export function authLogin(credentials: Credentials): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(AuthLoginPending());
    try {
      await login(credentials);
      dispatch(authLoginFulfilled());
    } catch (error) {
      if (error instanceof Error) {
        dispatch(AuthLoginRejected(error));
      }
    }
  };
}

export const authLogout = (): AuthLogout => ({
  type: "auth/logout",
});

export const advertsLoadedFulfilled = (
  adverts: Advert[],
): AdvertsLoadedFulfilled => ({
  type: "adverts/loaded/fulfilled",
  payload: adverts,
});

export const AdvertsCreatedFulFilled = (
  advert: Advert,
): AdvertsCreatedFulFilled => ({
  type: "adverts/created/fulfilled",
  payload: advert,
});

export function advertsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.adverts) {
      return;
    }
    try {
      const adverts = await getAdverts();
      dispatch(advertsLoadedFulfilled(adverts));
    } catch (error) {
      console.log(error);
    }
  };
}

export function advertsCreate(
  advertContent: FormData,
): AppThunk<Promise<Advert>> {
  return async function (dispatch) {
    try {
      const createdAdvert = await newAdvert(advertContent);
      const advert = await getAdvert(createdAdvert.id.toString());
      dispatch(AdvertsCreatedFulFilled(advert));
      return advert;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export const resetError = (): UiResetError => ({
  type: "ui/reset-error",
});

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | AdvertsLoadedFulfilled
  | AdvertsCreatedFulFilled
  | UiResetError;
