import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TrainingModel} from "../../../models/trainingModel";
import {MatTableDataSource} from "@angular/material/table";
import {TrainingService} from "../../../services/training.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {getFinished, TState} from "../../../reducers/training/training.reducer";

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<TrainingModel>();
  @ViewChild(MatSort) matSort?: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator?: MatPaginator;
  // trainingsListener = new Subscription()

  constructor(private tr: TrainingService, private store: Store<TState>) {
  }

  ngOnInit(): void {
    this.tr.fetchTrainings();
    this.dataSource.data = this.tr.trainings
    this.store.select(getFinished).subscribe(data => {
      this.dataSource.data = data
    })
    /*this.trainingsListener = this.tr.trainingsChanged.subscribe(res => {
      // console.log('RES', res)
      this.dataSource.data = res
    });*/
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  doFilter(filterValue: any) {
    console.log('FILTER VALUE', filterValue.value)
    this.dataSource.filter = filterValue?.value.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    // this.trainingsListener.unsubscribe()
  }

}
