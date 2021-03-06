import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  authListener = new Subscription()
  isAuth?: boolean
  title = 'ngrx-app';

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    this.authListener = this.auth.isAuthChanged.subscribe(status => {
      this.isAuth = status;
    });
    this.auth.initAuthListener()
  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
  }
}
