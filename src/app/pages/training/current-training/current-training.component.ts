import {EventEmitter, OnDestroy} from '@angular/core';
import {Component, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TrainingDialogComponent} from "../training-dialog/training-dialog.component";
import {TrainingService} from "../../../services/training.service";
import {Subscription} from "rxjs";
import {TrainingModel} from "../../../models/trainingModel";
import {Store} from "@ngrx/store";
import {getActive, TState} from "../../../reducers/training/training.reducer";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress = 0
  timer?: any;
  @Output() onExit = new EventEmitter()
  training?: TrainingModel;

  constructor(public dialog: MatDialog, private tr: TrainingService,
              private store: Store<TState>) {
  }


  ngOnInit(): void {
    this.training = this.tr.activeTraining

    this.startResumerTimer()
  }

  startResumerTimer() {
    this.store.select(getActive).pipe(take(1)).subscribe(active => {
      console.log('ACTIVE', active)
      if (!active) return
      const step = active.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress += 10;
        if (this.progress >= 100) {
          this.tr.completeTraining()
          clearInterval(this.timer)
        }
      }, step)
    });

    /* this.timer = setInterval(() => {
       this.progress += 10;
       if (this.progress >= 100) {
         this.tr.completeTraining()
         clearInterval(this.timer)
       }
     }, step)*/
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
