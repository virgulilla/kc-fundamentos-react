import { useAppDispatch, useAppSelector } from ".";
import { authLogin, authLogout } from "./actions";
import { hasLogged } from "./selectors";

export function useAuth() {
    return useAppSelector(hasLogged)
}

export function useLoginAction() {
    const dispatch = useAppDispatch()
    return function() {
        return dispatch(authLogin())
    }
}

export function useLogoutAction() {
    const dispatch = useAppDispatch()
    return function() {
        return dispatch(authLogout())
    }
}