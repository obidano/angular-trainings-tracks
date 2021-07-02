import {Action} from "@ngrx/store";
import {START_LOADING, STOP_LOADING} from "../ui.actions";
import {TrainingModel} from "../../models/trainingModel";

export const SET_AVAILABLE = 'SET_AVAILABLE'
export const SET_FINISHED = 'SET_FINISHED'
export const START_TRAINING = 'START_TRAINING'
export const STOP_TRAINING = 'STOP_TRAINING'

export class SetAvailable implements Action {
  readonly type = SET_AVAILABLE
  constructor(public payload:TrainingModel[]) {}
}

export class SetFinisehd implements Action {
  readonly type = SET_FINISHED
  constructor(public payload:TrainingModel[]) {}

}

export class StartTraining implements Action {
  readonly type = START_TRAINING
  constructor(public payload:string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING

}
// export type AuthActions = SetAuthenticated | SetUnauthenticated
