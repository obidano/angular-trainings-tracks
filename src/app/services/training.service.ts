import {Injectable} from '@angular/core';
import {TrainingModel} from "../models/trainingModel";
import {Observable, Subject, Subscription} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {map, take} from 'rxjs/operators'
import {UiService} from "./ui.service";
import {Store} from "@ngrx/store";
import {getActive, TState} from "../reducers/training/training.reducer";
import {SetAvailable, SetFinisehd, StartTraining, StopTraining} from "../reducers/training/training.actions";
import {StartLoading, StopLoading} from "../reducers/ui.actions";

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

  constructor(private fire: AngularFirestore, private ui: UiService,
              private store: Store<TState>) {
  }

  get availableTrainings(): TrainingModel[] {
    return [...this._availableTrainings];
  }

  fetchAvailableTrainings() {
    this.store.dispatch(new StartLoading())

    const data = this.fire
      .collection(Avcollection)
      .snapshotChanges()
      .pipe(map(docArray => {
        // throw new Error()
        return docArray.map(d => {
          const {doc} = d.payload
          return {id: doc.id, ...doc.data() as {}}
        })
      })).subscribe((res) => {
        // console.log("RES", res)
        // this._availableTrainings = res as TrainingModel[];
        this.store.dispatch(new SetAvailable(res as TrainingModel[]))
        // this.availablesChanged.next(this.availableTrainings)
        this.store.dispatch(new StopLoading())

      }, _ => {
        this.store.dispatch(new StopLoading())
        this.ui.openSnack("Failed to fetch availables trainings");
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
        this.store.dispatch(new SetFinisehd(res as TrainingModel[]))

        // this.trainingsChanged.next(this.trainings)
      }, _ => this.ui.openSnack("Failed to fetch trainings data"))
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
    // const res = this.availableTrainings.find(i => i.id == selectedId)
    // this.isActiveChanged.next({...this._activeTraining as TrainingModel})
    this.store.dispatch(new StartTraining(selectedId))
  }

  completeTraining() {
    this.store.select(getActive).pipe(take(1)).subscribe(active => {
      if (!active) return
      this.addDataToFirestore({
        ...active,
        date: new Date(),
        state: 'completed'
      } as TrainingModel)
      // this._activeTraining = null;
      // this.isActiveChanged.next(null)
      this.store.dispatch(new StopTraining())

    })


  }

  cancelExercice(progress: number) {
    this.store.select(getActive).pipe(take(1)).subscribe(active => {
      if (!active) return
      this.addDataToFirestore({
        ...active,
        date: new Date(),
        duration: this.activeTraining.duration * (progress / 100),
        calories: this.activeTraining.calories * (progress / 100),
        state: 'canceled',
      } as TrainingModel)
      // this._activeTraining = null;
      this.store.dispatch(new StopTraining())

    })
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((subs) => {
      subs.unsubscribe();
    })
  }

  private addDataToFirestore(data: TrainingModel) {
    this.fire.collection(finishcollection).add(data)
  }
}
