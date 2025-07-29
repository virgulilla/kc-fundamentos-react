import type { AppThunk } from ".";
import type { Credentials } from "../pages/auth/types";
import { getAdvert } from "./selectors";
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

type AdvertsDetailFulfilled = {
  type: "adverts/detail/fulfilled";
  payload: Advert;
};

type AdvertsDetailRejected = {
  type: "adverts/detail/rejected";
  payload: Error;
};

type AdvertsCreatedFulFilled = {
  type: "adverts/created/fulfilled";
  payload: Advert;
};

type AdvertsCreatedRejected = {
  type: "adverts/created/rejected";
  payload: Error;
};

type UiResetError = {
  type: "ui/reset-error";
};

export const authLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

export const authLoginRejected = (error: Error): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});

export function authLogin(credentials: Credentials): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    dispatch(authLoginPending());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginFulfilled());
      const to = router.state.location.state?.from ?? "/";
      router.navigate(to, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        dispatch(authLoginRejected(error));
      }
      throw error;
    }
  };
}

export function authLogout(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    await api.auth.logout();
    dispatch({ type: "auth/logout" });
  };
}

export const advertsLoadedFulfilled = (
  adverts: Advert[],
): AdvertsLoadedFulfilled => ({
  type: "adverts/loaded/fulfilled",
  payload: adverts,
});

export const advertsDetailFulFilled = (
  advert: Advert,
): AdvertsDetailFulfilled => ({
  type: "adverts/detail/fulfilled",
  payload: advert,
});

export const advertsDetailRejected = (error: Error): AdvertsDetailRejected => ({
  type: "adverts/detail/rejected",
  payload: error,
});

export const AdvertsCreatedFulFilled = (
  advert: Advert,
): AdvertsCreatedFulFilled => ({
  type: "adverts/created/fulfilled",
  payload: advert,
});

export const advertsCreatedRejected = (
  error: Error,
): AdvertsCreatedRejected => ({
  type: "adverts/created/rejected",
  payload: error,
});

export function advertsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
    const state = getState();
    if (state.adverts.loaded) {
      return;
    }
    try {
      const adverts = await api.adverts.getAdverts();
      dispatch(advertsLoadedFulfilled(adverts));
    } catch (error) {
      console.log(error);
    }
  };
}

export function advertsDetail(id: string): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
    const state = getState();
    if (getAdvert(id)(state)) {
      return;
    }
    try {
      const advert = await api.adverts.getAdvert(id);
      dispatch(advertsDetailFulFilled(advert));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(advertsDetailRejected(error));
      }
      throw error;
    }
  };
}

export function advertsCreate(
  advertContent: FormData,
): AppThunk<Promise<Advert>> {
  return async function (dispatch, _getState, { api, router }) {
    try {
      const createdAdvert = await api.adverts.newAdvert(advertContent);
      const advert = await api.adverts.getAdvert(createdAdvert.id.toString());
      dispatch(AdvertsCreatedFulFilled(advert));
      router.navigate(`/adverts/${createdAdvert.id}`);
      return advert;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        dispatch(advertsCreatedRejected(error));
      }
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
  | AdvertsDetailFulfilled
  | AdvertsDetailRejected
  | AdvertsCreatedFulFilled
  | AdvertsCreatedRejected
  | UiResetError;

export type ActionsRejected =
  | AuthLoginRejected
  | AdvertsCreatedRejected
  | AdvertsDetailRejected;
