import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
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
