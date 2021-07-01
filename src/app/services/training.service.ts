import {Injectable} from '@angular/core';
import {TrainingModel} from "../models/trainingModel";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  isActiveChanged = new Subject<TrainingModel | null>()
  private _trainings: TrainingModel[] = []

  private _availableTrainings: TrainingModel[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  ]

  private _activeTraining?: TrainingModel | null;

  constructor() {
  }

  get availableTrainings(): TrainingModel[] {
    return this._availableTrainings.slice();
  }

  get activeTraining(): TrainingModel {
    return {...this._activeTraining as TrainingModel};
  }

  get trainings(): TrainingModel[] {
    return [...this._trainings];
  }

  set trainings(value: TrainingModel[]) {
    this._trainings = value;
  }


  startTraining(selectedId: string) {
    this._activeTraining = this.availableTrainings.find(i => i.id == selectedId)
    this.isActiveChanged.next({...this._activeTraining as TrainingModel})
  }

  completeTraining() {
    this._trainings.push({
      ...this._activeTraining,
      date: new Date(),
      state: 'completed'
    } as TrainingModel)
    this._activeTraining = null;
    this.isActiveChanged.next(null)
  }

  cancelExercice(progress: number) {
    this._trainings.push({
      ...this._activeTraining,
      date: new Date(),
      duration: this.activeTraining.duration * (progress / 100),
      calories: this.activeTraining.duration * (progress / 100),
      state: 'canceled',
    } as TrainingModel)
    this._activeTraining = null;
    this.isActiveChanged.next(null)
  }
}