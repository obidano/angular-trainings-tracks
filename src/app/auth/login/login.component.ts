import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  pwd_type = "text"

  constructor() {
    setTimeout(() => this.pwd_type = 'password', 500)
  }

  ngOnInit(): void {
  }

  OnSubmit(form: NgForm) {
    console.log(form.value)
  }

}
