import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ChildGuard implements CanActivateChild {
  constructor(private authservice: AuthService, private router: Router) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authservice
      .checkUserAuth()
      .then((authenticated: boolean) =>
        authenticated == true ? true : this.router.navigate(["/"])
      );
  }
}
