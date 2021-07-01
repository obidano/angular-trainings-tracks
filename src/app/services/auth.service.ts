import {Injectable} from '@angular/core';
import {UserModel} from "../models/user.model";
import {AuthModel} from "../models/auth.model";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {TrainingService} from "./training.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UiService} from "./ui.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user?: UserModel | null
  isAuthChanged = new Subject<boolean>()
  isAuthenticated = false;

  constructor(private router: Router, private fireAuth: AngularFireAuth,
              private tr: TrainingService, private snack: MatSnackBar,
              private ui: UiService) {
    // this.onAuthSuccess();
  }

  initAuthListener() {
    this.fireAuth.authState.subscribe(user => {
      console.log("USER", user)
      if (user) {
        this.onAuthSuccess()
      } else {
        this.onLogout()
      }
    })
  }

  private onAuthSuccess() {
    this.isAuthenticated = true;
    this.router.navigate(['/training'])
    this.isAuthChanged.next(true)
  }

  private onLogout() {
    this.user = null;
    this.isAuthenticated = true;
    this.isAuthChanged.next(false)
    this.tr.cancelSubscriptions()
    this.router.navigate(['/login'])
  }

  async registerUser(auth: AuthModel) {
    this.ui.start_loading()

    try {
      const res: any = await this.fireAuth.createUserWithEmailAndPassword(auth.email, auth.password)
      console.log("SUCCESS", res.user)
      this.user = {email: res.user?.email, userId: res.user?.uid}
    } catch (err) {
      console.log('ERROR', err)
      this.ui.openSnack(err.message)
    }
    this.ui.stop_loading()

  }

  async login(auth: AuthModel) {
    this.ui.start_loading()
    try {
      const res: any = await this.fireAuth.signInWithEmailAndPassword(auth.email, auth.password)
      console.log("SUCCESS", res)
      this.user = {email: res.user?.email, userId: res.user?.uid}
    } catch (err) {
      console.log('ERROR', err)
      this.ui.openSnack(err.message)
    }
    this.ui.stop_loading()

  }

  logout() {
    this.fireAuth.signOut()


  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
