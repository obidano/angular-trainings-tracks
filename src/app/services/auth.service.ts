import {Injectable} from '@angular/core';
import {UserModel} from "../models/user.model";
import {AuthModel} from "../models/auth.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user?: UserModel | null
  isAuthChanged = new Subject<boolean>()

  constructor() {
  }

  registerUser(auth: AuthModel) {
    this.user = {
      email: auth.email,
      userId: Math.round(Math.random() * 1000).toString()
    }
  }

  login(auth: AuthModel) {
    this.user = {
      email: auth.email,
      userId: Math.round(Math.random() * 1000).toString()
    }

    this.isAuthChanged.next(true)
  }

  logout() {
    this.user = null;
    this.isAuthChanged.next(false)

  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }
}
