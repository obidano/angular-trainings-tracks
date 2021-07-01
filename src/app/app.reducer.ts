import {StateModel} from "./models/state.model";

const initialState:StateModel = {
  isLoading: false
}

export function AppReducer(state = initialState, action:any) {
  switch (action.type) {
    case 'START_LOADING':
      return {...state, isLoading: true}
    case 'STOP_LOADING':
      return {...state, isLoading: true}
    default:
      return state;

  }
}
