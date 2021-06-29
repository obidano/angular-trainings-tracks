import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  pwd_type = "text"
  maxDate: any;

  constructor() {
    setTimeout(() => this.pwd_type = 'password', 500)
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 18, 12, 31)
    console.log(this.maxDate.getFullYear())
  }

  OnSubmit(form: NgForm) {
    console.log(form.value)
  }
}
