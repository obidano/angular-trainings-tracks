import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  pwd_type = "text"
  maxDate: any;

  constructor(private auth: AuthService) {
    setTimeout(() => this.pwd_type = 'password', 500)
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 18, 12, 31)
    console.log(this.maxDate.getFullYear())
  }

  OnSubmit(form: NgForm) {
    console.log(form.value)
    this.auth.registerUser({
      email: form.value.email,
      password: form.value.pwd
    })
  }
}
