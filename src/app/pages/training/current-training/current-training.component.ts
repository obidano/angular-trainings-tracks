import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TrainingDialogComponent} from "../training-dialog/training-dialog.component";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0
  timer?: number;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 1000)
  }

  onStop() {
    let dialogRef = this.dialog.open(TrainingDialogComponent, {
      // height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        clearInterval(this.timer)
      }
    });


  }
}
