import { ApiMethod, AuthEndPoints } from "./../http/consts";
import { StorageService } from "./../../../storage/storage.service";
import { AuthPayload, registerPayload } from "./../../interfaces/auth";
import { ErrorService } from "./../error/error.service";
import { HttpService } from "./../http/http.service";
import { Injectable, OnDestroy } from "@angular/core";
import { observable, Subject } from "rxjs";
import { catchError, takeUntil, retry, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private token: string;
  private authStatusListener: Subject<boolean> = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  constructor(
    private http: HttpService,
    private err: ErrorService,
    private storage: StorageService
  ) {}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
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
      .subscribe(
        (res: any) => {
          console.log(res);
          const token = res.token;
          this.token = token;
          this.storage.saveItem("token", this.token);
          if (token) {
            console.log(this.token);
            this.err.userNotification(200, "successfully logged in");
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
          }
        }
        // (error) => console.log(error)
      );
  }

  currentUser() {
    this.http
      .requestCall(AuthEndPoints.CURRENT_USER, ApiMethod.GET)
      .pipe(takeUntil(this.destroy$.asObservable()))
      .subscribe((res) => {
        console.log(res);
      });
  }

  logout() {
    this.storage.removeItem("token");
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.authStatusListener.unsubscribe();
  }
}
