import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {TrainingService} from "../../services/training.service";
import {Store} from "@ngrx/store";
import {getIsTraining, TState} from "../../reducers/training/training.reducer";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingTraining$ ?: Observable<boolean>;
  // trainingListener = new Subscription()


  constructor(private tr: TrainingService, private store: Store<TState>) {
  }

  ngOnInit(): void {
    this.onGoingTraining$=this.store.select(getIsTraining)
   /* this.trainingListener = this.tr.isActiveChanged.subscribe(status => {
      console.log('status', status)
      this.onGoingTraining = !!status
    });*/
  }

  ngOnDestroy(): void {
    // this.trainingListener.unsubscribe();
  }

}
