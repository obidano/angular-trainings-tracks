import {Injectable} from '@angular/core';
import {UserModel} from "../models/user.model";
import {AuthModel} from "../models/auth.model";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user?: UserModel | null
  isAuthChanged = new Subject<boolean>()

  constructor(private router: Router) {
    // this.onAuthSuccess();
  }

  private onAuthSuccess() {
    this.router.navigate(['/training'])
    this.isAuthChanged.next(true)
  }

  registerUser(auth: AuthModel) {
    this.user = {
      email: auth.email,
      userId: Math.round(Math.random() * 1000).toString()
    }
    this.onAuthSuccess()
  }

  login(auth: AuthModel) {
    this.user = {
      email: auth.email,
      userId: Math.round(Math.random() * 1000).toString()
    }
    this.onAuthSuccess()
  }

  logout() {
    this.user = null;
    this.isAuthChanged.next(false)
    this.router.navigate(['/login'])

  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }
}
