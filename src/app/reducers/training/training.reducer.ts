import {AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from "./auth.actions";
import {TrainingModel} from "../../models/trainingModel";
import {State as RootState} from "../app.reducer"
import {SET_AVAILABLE, SET_FINISHED, START_TRAINING, STOP_TRAINING} from "./training.actions";


export interface TrainingState {
  availableTrainings: TrainingModel[];
  finished: TrainingModel[],
  active: TrainingModel | null
}

export interface State extends RootState {

}

const initialState: TrainingState = {
  availableTrainings: [],
  finished: [],
  active: null
}

export function TrainingReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_AVAILABLE:
      return {...state, availableTrainings: action.payload}
    case SET_FINISHED:
      return {...state, finished: action.payload}
    case START_TRAINING:
      return {...state, active: action.payload}
    case STOP_TRAINING:
      return {...state, active: null}

    default:
      return state;

  }
}

export const getAvlble = (state: TrainingState) => state.availableTrainings
export const getFinished = (state: TrainingState) => state.finished
export const getActive = (state: TrainingState) => state.active
