import {Injectable} from '@angular/core';
import {TrainingModel} from "../models/trainingModel";
import {Observable, Subject} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from 'rxjs/operators'

const Avcollection = 'availableTrainings'
const finishcollection = 'finishedTrainings'

@Injectable({
  providedIn: 'root'
})
export class TrainingService {


  isActiveChanged = new Subject<TrainingModel | null>()
  availablesChanged = new Subject<TrainingModel[]>()
  trainingsChanged = new Subject<TrainingModel[]>()
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
      .collection(Avcollection)
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(d => {
          const {doc} = d.payload
          return {id: doc.id, ...doc.data() as {}}
        })
      }))

    data.subscribe((res) => {
      console.log("RES", res)
      this._availableTrainings = res as TrainingModel[];
      this.availablesChanged.next(this.availableTrainings)
    })

  }

  fetchTrainings() {
    const data = this.fire
      .collection(finishcollection)
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(d => {
          const {doc} = d.payload
          const data = doc.data() as TrainingModel
          return {
            ...data, id: doc.id,
            date: data?.date?.toDate()
          }
        })
      }))

    data.subscribe((res) => {
      console.log("RES", res)
      this._trainings = res as TrainingModel[];
      this.trainingsChanged.next(this.trainings)
    })

  }

  get activeTraining(): TrainingModel {
    return {...this._activeTraining as TrainingModel};
  }

  get trainings(): TrainingModel[] {
    return [...this._trainings];
  }


  startTraining(selectedId: string) {
    this._activeTraining = this.availableTrainings.find(i => i.id == selectedId)
    this.isActiveChanged.next({...this._activeTraining as TrainingModel})
  }

  completeTraining() {
    this.addDataToFirestore({
      ...this._activeTraining,
      date: new Date(),
      state: 'completed'
    } as TrainingModel)
    this._activeTraining = null;
    this.isActiveChanged.next(null)
  }

  cancelExercice(progress: number) {
    this.addDataToFirestore({
      ...this._activeTraining,
      date: new Date(),
      duration: this.activeTraining.duration * (progress / 100),
      calories: this.activeTraining.calories * (progress / 100),
      state: 'canceled',
    } as TrainingModel)
    this._activeTraining = null;
    this.isActiveChanged.next(null)
  }

  private addDataToFirestore(data: TrainingModel) {
    this.fire.collection(finishcollection).add(data)
  }
}
