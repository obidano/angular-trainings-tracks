import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UiService} from "../../services/ui.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {StateModel} from "../../models/state.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  pwd_type = "text"
  isLoading$?: Observable<any>;

  // loadingSubs = new Subscription()

  constructor(private auth: AuthService, private ui: UiService,
              private store: Store<{ app: StateModel }>) {
    setTimeout(() => this.pwd_type = 'password', 500)
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(map(st => st.app.isLoading))
    // this.isLoading$.subscribe(d => console.log('ISLOADING', d))
    // this.loadingSubs = this.ui.loadingStateChanged.subscribe(val => this.isLoading = val)
  }

  OnSubmit(form: NgForm) {
    console.log(form.value)
    const {value} = form
    this.auth.login({email: value.email, password: value.pwd})
  }

  ngOnDestroy(): void {
    // this.loadingSubs.unsubscribe()
  }

}
