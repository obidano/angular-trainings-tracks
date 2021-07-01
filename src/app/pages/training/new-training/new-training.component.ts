import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TrainingService} from "../../../services/training.service";
import {TrainingModel} from "../../../models/trainingModel";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  activity_types = [{label: 'Saut à la corde', value: 'saut_corde'}];
  @Output() onCreate = new EventEmitter()
  availableTrainings?: Observable<any>

  constructor(private tr: TrainingService) {
  }

  ngOnInit(): void {
    this.availableTrainings = this.tr.getAvailableTrainings();
  }

  submitTraining(form: NgForm) {
    this.tr.startTraining(form.value.training);
//     this.onCreate.emit()


  }

  valueChange(target: any) {
    console.log('CHANGE', target?.value)
  }
}
