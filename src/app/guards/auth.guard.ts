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


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isAuth()) {
      return true
    }
    this.router.navigate(['/login'])
    return false
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    console.log("CAN LOAD")
    if (this.auth.isAuth()) {
      return true
    }
    this.router.navigate(['/login'])
    return false
  }
}
