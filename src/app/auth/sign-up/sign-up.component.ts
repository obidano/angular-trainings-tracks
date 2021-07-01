import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit,OnDestroy {
  pwd_type = "text"
  maxDate: any;
  isLoading = false;
  loadingSubs = new Subscription()

  constructor(private auth: AuthService, private ui: UiService) {
    setTimeout(() => this.pwd_type = 'password', 500)
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 18, 12, 31)
    console.log(this.maxDate.getFullYear())
    this.loadingSubs = this.ui.loadingStateChanged.subscribe(val => this.isLoading = val)

  }

  OnSubmit(form: NgForm) {
    console.log(form.value)
    this.auth.registerUser({
      email: form.value.email,
      password: form.value.pwd
    })
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe()
  }
}
