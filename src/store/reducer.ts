import type { Advert } from "../pages/advert/types";
import type { Actions } from "./actions";

export type State = {
  auth: boolean;
  adverts: Advert[] | null;
  ui: {
    pending: boolean;
    error: Error | null;
  };
};

const defaultState: State = {
  auth: false,
  adverts: null,
  ui: {
    pending: false,
    error: null,
  },
};

export function auth(
  state = defaultState.auth,
  action: Actions,
): State["auth"] {
  switch (action.type) {
    case "auth/login/fulfilled":
      return true;
    case "auth/logout":
      return false;
    default:
      return state;
  }
}

export function adverts(
  state = defaultState.adverts,
  action: Actions,
): State["adverts"] {
  switch (action.type) {
    case "adverts/loaded/fulfilled":
      return action.payload;
    case "adverts/created/fulfilled":
      return [action.payload, ...(state ?? [])];
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  if (action.type === "auth/login/pending") {
    return { ...state, pending: true, error: null };
  }
  if (action.type === "auth/login/fulfilled") {
    return { ...state, pending: false, error: null };
  }
  if (action.type === "auth/login/rejected") {
    return { ...state, pending: false, error: action.payload };
  }
  if (action.type === "ui/reset-error") {
    return { ...state, error: null };
  }
  return state;
}
