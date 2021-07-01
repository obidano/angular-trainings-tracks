import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UiService} from "../../services/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  pwd_type = "text"
  isLoading = false;
  loadingSubs = new Subscription()

  constructor(private auth: AuthService, private ui: UiService) {
    setTimeout(() => this.pwd_type = 'password', 500)
  }

  ngOnInit(): void {
    this.loadingSubs = this.ui.loadingStateChanged.subscribe(val => this.isLoading = val)
  }

  OnSubmit(form: NgForm) {
    console.log(form.value)
    const {value} = form
    this.auth.login({email: value.email, password: value.pwd})
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe()
  }

}
