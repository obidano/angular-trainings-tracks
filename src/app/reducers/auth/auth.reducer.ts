import {AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from "./auth.actions";

export interface RAuthModel {
  isAuthenticated: boolean;
}

const initialState: RAuthModel = {
  isAuthenticated: false
}

export function AuthReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {...state, isAuthenticated: true}
    case SET_UNAUTHENTICATED:
      return {...state, isAuthenticated: false}

    default:
      return state;

  }
}

export const getIsAuthenticated = (state: RAuthModel) => state.isAuthenticated
