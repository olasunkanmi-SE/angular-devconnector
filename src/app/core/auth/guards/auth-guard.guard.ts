import { AuthService } from "./../services/auth/auth.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuth = this.authservice.getIsAuthenticated();
    if (!isAuth) {
      return this.router.navigate(["auth/signup"]);
    }
    return true;
  }
}
