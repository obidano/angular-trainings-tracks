import {EventEmitter, OnDestroy, Output} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {getIsAuthenticate, State} from "../../reducers/app.reducer";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggle = new EventEmitter()
  authListener = new Subscription()
  isAuth$?: Observable<boolean>


  constructor(private auth: AuthService,  private store: Store<State>) {
  }

  ngOnInit(): void {
    this.isAuth$=this.store.select(getIsAuthenticate)

    /* this.authListener = this.auth.isAuthChanged.subscribe(status => {
       this.isAuth = status;
     });*/
  }

  onToggle() {
    this.toggle.emit()
  }

  onLogout() {
    this.auth.logout()
  }

  ngOnDestroy(){
    this.authListener.unsubscribe();
  }
}
