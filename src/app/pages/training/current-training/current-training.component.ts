import {EventEmitter, OnDestroy} from '@angular/core';
import {Component, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TrainingDialogComponent} from "../training-dialog/training-dialog.component";
import {TrainingService} from "../../../services/training.service";
import {Subscription} from "rxjs";
import {TrainingModel} from "../../../models/trainingModel";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress = 0
  timer?: number;
  @Output() onExit = new EventEmitter()
  training?: TrainingModel;

  constructor(public dialog: MatDialog, private tr: TrainingService) {
  }


  ngOnInit(): void {
    this.training = this.tr.activeTraining

    this.startResumerTimer()
  }

  startResumerTimer() {
    const step = this.tr.activeTraining.duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        this.tr.completeTraining()
        clearInterval(this.timer)
      }
    }, step)
  }

  onStop() {
    clearInterval(this.timer)

    if (this.progress == 100) {
      // this.onExit.emit()
      return
    }

    let dialogRef = this.dialog.open(TrainingDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result == 1) {
        this.startResumerTimer()
      }

      if (result == 0) {
        this.tr.cancelExercice(this.progress)
        // this.onExit.emit()
      }
    });


  }

  ngOnDestroy(): void {
  }
}
