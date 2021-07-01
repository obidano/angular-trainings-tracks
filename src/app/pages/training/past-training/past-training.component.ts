import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TrainingModel} from "../../../models/trainingModel";
import {MatTableDataSource} from "@angular/material/table";
import {TrainingService} from "../../../services/training.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<TrainingModel>();
  @ViewChild(MatSort) matSort?: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator?: MatPaginator;

  constructor(private tr: TrainingService) {
  }

  ngOnInit(): void {
    this.dataSource.data = this.tr.trainings
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  doFilter(filterValue: any) {
    console.log('FILTER VALUE', filterValue.value)
    this.dataSource.filter = filterValue?.value.trim().toLowerCase();
  }

}
