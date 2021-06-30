import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  pwd_type = "text"

  constructor(private auth: AuthService) {
    setTimeout(() => this.pwd_type = 'password', 500)
  }

  ngOnInit(): void {
  }

  OnSubmit(form: NgForm) {
    console.log(form.value)
    const {value} = form
    this.auth.login({email: value.email, password: value.pwd})
  }

}
