import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TrainingService} from "../../../services/training.service";
import {TrainingModel} from "../../../models/trainingModel";
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  activity_types = [{label: 'Saut à la corde', value: 'saut_corde'}];
  @Output() onCreate = new EventEmitter()
  availableTrainings: TrainingModel[] = []
  availableListener = new Subscription()


  constructor(private tr: TrainingService) {
  }


  ngOnInit(): void {
    this.tr.fetchAvailableTrainings()
    this.availableListener = this.tr.availablesChanged.subscribe(res => {
      // console.log('RES', res)
      this.availableTrainings = res;
    });
  }

  submitTraining(form: NgForm) {
    this.tr.startTraining(form.value.training);
//     this.onCreate.emit()


  }

  valueChange(target: any) {
    console.log('CHANGE', target?.value)
  }

  ngOnDestroy(): void {
    this.availableListener.unsubscribe()
  }

}
