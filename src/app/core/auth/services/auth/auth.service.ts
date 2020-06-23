import { ProfileService } from "./../../../../pages/profiles/shared/profile.service";
import { User } from "./../../../../pages/posts/model/user";
import { environment } from "./../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ApiMethod, AuthEndPoints } from "./../http/consts";
import { StorageService } from "./../../../storage/storage.service";
import { AuthPayload } from "./../../interfaces/auth";
import { ErrorService } from "./../error/error.service";
import { HttpService } from "./../http/http.service";
import { Injectable, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { takeUntil, take } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private token: string;
  private authStatusListener: Subject<boolean> = new Subject<boolean>();

  private userAuthenticated: boolean = false;
  private tokenTimer: any;
  backendURL = environment.backendAPI;
  currentUserSub: Subscription;
  userProfileSub: Subscription;
  userHandle: string;

  constructor(
    private http: HttpService,
    private err: ErrorService,
    private storage: StorageService,
    private router: Router,
    private httpclient: HttpClient,
    private profileService: ProfileService
  ) {}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated() {
    return this.userAuthenticated;
  }

  register(registerPayload: AuthPayload) {
    this.http
      .requestCall(AuthEndPoints.REGISTER, ApiMethod.POST, registerPayload)
      .pipe(takeUntil(this.destroy$.asObservable()))
      .subscribe(
        (res: any) => {
          console.log(res);
          this.err.userNotification(201, "registration successful");
        },
        (error) => console.log(error)
      );
  }

  login(loginPayload: AuthPayload) {
    this.http
      .requestCall(AuthEndPoints.AUTH, ApiMethod.POST, loginPayload)
      .pipe(takeUntil(this.destroy$.asObservable()))
      .subscribe((res: any) => {
        console.log(res);
        const token = res.token;
        this.token = token;
        this.err.userNotification(200, "successfully logged in");
        if (token) {
          const expiresIn = res.expiresIn;
          const tokenExpires = expiresIn * 1000;
          this.setLogOutTimer(tokenExpires);
          const expirationTime = Date.now() + tokenExpires;
          this.userAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(token, expirationTime.toString());
          this.getCurrentUserProfile();
          setTimeout(() => {
            if (this.storage.getItem("handle")) {
              this.router.navigate(["pages/posts"]);
            } else {
              this.router.navigate(["onboarding/info"]);
            }
          }, 1000);
        }
      });
  }

  getToken() {
    return this.token;
  }

  currentUser$() {
    return this.httpclient
      .get<User>(`${this.backendURL}/auth/current`)
      .pipe(takeUntil(this.destroy$.asObservable()));
  }

  getCurrentUser() {
    this.currentUserSub = this.currentUser$().subscribe((res) =>
      console.log(res)
    );
  }

  getCurrentUserProfile() {
    this.userProfileSub = this.profileService
      .getCurrentUserProfile$()
      .subscribe((res) => {
        this.userHandle = res.handle;
        this.storage.saveItem("handle", this.userHandle);
      });
  }

  getUsers$() {
    return this.httpclient
      .get<{ count: any; users: any }>(`${this.backendURL}/users`)
      .pipe(takeUntil(this.destroy$));
  }

  logout() {
    this.clearAuthData();
    this.userAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(["/"]);
  }

  clearStorage() {
    this.clearAuthData();
  }

  autoAuthenticateUser(): any {
    if (+this.storage.getItem("expiration") > Date.now()) {
      const userAuthInfo = this.getAuthData();
      this.token = userAuthInfo.token;
      this.userAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  checkTokenStatus() {
    return this.tokenExpiration();
  }

  private tokenExpiration(): boolean {
    if (this.storage.getItem("expiration") !== null) {
      const userAuthInfo = this.getAuthData();
      const tokenExpiry = +userAuthInfo.expiration - Date.now();
      return tokenExpiry < 0 ? true : false;
    }
  }

  private setLogOutTimer(duration) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private getAuthData() {
    const token = this.storage.getItem("token");
    const expiration: string = this.storage.getItem("expiration");
    if (!token || !expiration) return;
    return {
      token: token,
      expiration: expiration,
    };
  }

  private saveAuthData(token: string, expirationDate: string) {
    this.storage.saveItem("token", token);
    this.storage.saveItem("expiration", expirationDate);
  }

  private clearAuthData() {
    this.storage.removeItem("token");
    this.storage.removeItem("expiration");
    this.storage.removeItem("handle");
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.authStatusListener.unsubscribe();
    if (this.currentUserSub) {
      this.currentUserSub.unsubscribe();
    }
    this.userProfileSub.unsubscribe();
    clearTimeout(this.tokenTimer);
  }
}
