import {Injectable} from '@angular/core';
import {TrainingModel} from "../models/trainingModel";
import {Observable, Subject, Subscription} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from 'rxjs/operators'

const Avcollection = 'availableTrainings'
const finishcollection = 'finishedTrainings'

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  trainingsChanged = new Subject<TrainingModel[]>()
  availablesChanged = new Subject<TrainingModel[]>()
  isActiveChanged = new Subject<TrainingModel | null>()

  private fbSubs: Subscription[] = []


  private _trainings: TrainingModel[] = []
  private _availableTrainings: TrainingModel[] = [];
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
      })).subscribe((res) => {
        // console.log("RES", res)
        this._availableTrainings = res as TrainingModel[];
        this.availablesChanged.next(this.availableTrainings)
      })

    this.fbSubs.push(data);
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
      })).subscribe((res) => {
        // console.log("RES", res)
        this._trainings = res as TrainingModel[];
        this.trainingsChanged.next(this.trainings)
      })
    this.fbSubs.push(data)
  }

  get activeTraining(): TrainingModel {
    return {...this._activeTraining as TrainingModel};
  }

  get trainings(): TrainingModel[] {
    return [...this._trainings];
  }


  startTraining(selectedId: string) {
    this.fire.doc(Avcollection + '/' + selectedId).update({lastSelected: new Date()})
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

  cancelSubscriptions() {
    this.fbSubs.forEach((subs) => {

    })
  }

  private addDataToFirestore(data: TrainingModel) {
    this.fire.collection(finishcollection).add(data)
  }
}
