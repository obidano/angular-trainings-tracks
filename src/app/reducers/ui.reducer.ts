import {START_LOADING, STOP_LOADING} from "./ui.actions";

export interface UiState {
  isLoading: boolean;
}

const initialState: UiState = {
  isLoading: false
}

export function UiReducer(state = initialState, action: any) {
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true}
    case STOP_LOADING:
      return {...state, isLoading: false}
    default:
      return state;

  }
}

export const getIsLoading = (state: UiState) => state.isLoading
