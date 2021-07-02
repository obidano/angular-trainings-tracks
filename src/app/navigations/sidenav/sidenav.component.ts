import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {getIsAuthenticate, State} from "../../reducers/app.reducer";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter()
  authListener = new Subscription()
  isAuth$?: Observable<boolean>

  constructor(private auth: AuthService, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.isAuth$=this.store.select(getIsAuthenticate)
   /* this.authListener = this.auth.isAuthChanged.subscribe(status => {
      this.isAuth = status;
    });*/
  }

  onClose() {
    this.close.emit()
  }

  onLogout() {
    this.onClose();
    this.auth.logout()

  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
  }
}
