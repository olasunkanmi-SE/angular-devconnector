import { StorageService } from "./../../storage/storage.service";
import { AuthService } from "./../services/auth/auth.service";
import { Router, UrlSegment, CanLoad } from "@angular/router";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { Route } from "@angular/compiler/src/core";

@Injectable({
  providedIn: "root",
})
export class AuthGuardGuard implements CanActivate, CanLoad {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private storage: StorageService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (+this.storage.getItem("expiration") < Date.now()) {
      this.authservice.clearStorage();
      return this.router.navigate(["auth/login"]);
    }
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (+this.storage.getItem("expiration") < Date.now()) {
      this.authservice.clearStorage();
      return this.router.navigate(["auth/login"]);
    }
    return true;
  }
}
