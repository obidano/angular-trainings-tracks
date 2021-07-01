import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snack: MatSnackBar) {

  }

  start_loading = () => this.loadingStateChanged.next(true)
  stop_loading = () => this.loadingStateChanged.next(false)

  openSnack(message: any) {
    this.snack.open(message, 'OK', {})
  }
}
