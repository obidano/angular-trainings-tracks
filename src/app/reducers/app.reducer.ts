import {START_LOADING, STOP_LOADING} from "./ui.actions";
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";
import {getIsLoading, UiState, UiReducer} from "./ui.reducer";
import {AuthReducer, getIsAuthenticated, AuthState} from "./auth/auth.reducer";


export interface State {
  ui: UiState,
  auth: AuthState
}

export const reducers: ActionReducerMap<State> = {
  ui: UiReducer,
  auth: AuthReducer
}

export const getUiState = createFeatureSelector<UiState>('ui')
export const getIsLoadin = createSelector(getUiState, getIsLoading)


export const getAuthState = createFeatureSelector<AuthState>('auth')
export const getIsAuthenticate = createSelector(getAuthState, getIsAuthenticated)
