import {TrainingModel} from "../../models/trainingModel";
import {State as RootState} from "../app.reducer"
import {SET_AVAILABLE, SET_FINISHED, START_TRAINING, STOP_TRAINING} from "./training.actions";
import {createFeatureSelector, createSelector} from "@ngrx/store";


export interface TrainingState {
  availableTrainings: TrainingModel[];
  finished: TrainingModel[];
  active?: TrainingModel;
}

export interface TState extends RootState {

}

const initialState: TrainingState = {
  availableTrainings: [],
  finished: [],
  active: undefined
}

export function TrainingReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_AVAILABLE:
      return {...state, availableTrainings: action.payload}
    case SET_FINISHED:
      return {...state, finished: action.payload}
    case START_TRAINING:
      return {...state, active: {...state.availableTrainings.find(i => i.id == action.payload)}}
    case STOP_TRAINING:
      return {...state, active: null}

    default:
      return state;

  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training')

export const getAvlble = createSelector(getTrainingState, (state: TrainingState) => state.availableTrainings)
export const getFinished = createSelector(getTrainingState, (state: TrainingState) => state.finished)
export const getActive = createSelector(getTrainingState, (state: TrainingState) => state.active)
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.active != null)

