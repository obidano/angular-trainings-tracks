import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Store} from "@ngrx/store";
import {getIsAuthenticate, State} from "../reducers/app.reducer";
import {take} from "rxjs/operators";


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private auth: AuthService, private router: Router,
              private store: Store<State>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(getIsAuthenticate).pipe(take(1))
    /* if (this.auth.isAuth()) {
      return true
    }
    this.router.navigate(['/login'])
    return false*/
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.store.select(getIsAuthenticate).pipe(take(1))
    /* console.log("CAN LOAD")
     if (this.auth.isAuth()) {
       return true
     }
     this.router.navigate(['/login'])
     return false*/
  }
}
