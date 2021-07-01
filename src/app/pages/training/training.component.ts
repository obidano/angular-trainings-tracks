import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TrainingService} from "../../services/training.service";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingTraining = false;
  trainingListener = new Subscription()


  constructor(private tr: TrainingService) {
  }

  ngOnInit(): void {
    this.trainingListener = this.tr.isActiveChanged.subscribe(status => {
      console.log('status', status)
      this.onGoingTraining = !!status
    });
  }

  ngOnDestroy(): void {
    this.trainingListener.unsubscribe();
  }

}
