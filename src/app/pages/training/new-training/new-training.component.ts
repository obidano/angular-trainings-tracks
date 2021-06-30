import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  activity_types = [{label: 'Saut à la corde', value: 'saut_corde'}];
  @Output() onCreate=new EventEmitter()

  constructor() {
  }

  ngOnInit(): void {
  }

  submitTraining() {

    this.onCreate.emit()

  }
}
