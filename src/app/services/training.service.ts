import {Injectable} from '@angular/core';
import {TrainingModel} from "../models/trainingModel";
import {Observable, Subject} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TrainingService {


  isActiveChanged = new Subject<TrainingModel | null>()
  availablesChanged = new Subject<TrainingModel[]>()
  private _trainings: TrainingModel[] = []

  private _availableTrainings: TrainingModel[] = [];
  /* = [
    /!* {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
     {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
     {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
     {id: 'burpees', name: 'Burpees', duration: 60, calories: 8}*!/
  ]*/

  private _activeTraining?: TrainingModel | null;

  constructor(private fire: AngularFirestore) {
  }

  get availableTrainings(): TrainingModel[] {
    return [...this._availableTrainings];
  }

  fetchAvailableTrainings() {
    const data = this.fire
      .collection('availableTrainings')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          const r = doc.payload.doc
          const d = r.data() as {}
          return {
            id: r.id,
            ...d
          }
        })
      }))

    data.subscribe((res) => {
      console.log("RES", res)
      this._availableTrainings = res as TrainingModel[];
      this.availablesChanged.next(this.availableTrainings)
    })

  }

  get activeTraining(): TrainingModel {
    return {...this._activeTraining as TrainingModel};
  }

  get trainings(): TrainingModel[] {
    return [...this._trainings];
  }


  startTraining(selectedId: string) {
    // this._activeTraining = this.availableTrainings.find(i => i.id == selectedId)
    // this.isActiveChanged.next({...this._activeTraining as TrainingModel})
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
      calories: this.activeTraining.calories * (progress / 100),
      state: 'canceled',
    } as TrainingModel)
    this._activeTraining = null;
    this.isActiveChanged.next(null)
  }
}
