import {Component, OnInit} from '@angular/core';
import {TrainingModel} from "../../../models/trainingModel";
import {MatTableDataSource} from "@angular/material/table";
import {TrainingService} from "../../../services/training.service";

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<TrainingModel>();

  constructor(private re: TrainingService) {
  }

  ngOnInit(): void {
  }

}
