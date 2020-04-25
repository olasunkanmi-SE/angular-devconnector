import { ApiMethod, AuthEndPoints } from "./../http/consts";
import { StorageService } from "./../../../storage/storage.service";
import { AuthPayload, registerPayload } from "./../../interfaces/auth";
import { ErrorService } from "./../error/error.service";
import { HttpService } from "./../http/http.service";
import { Injectable } from "@angular/core";
import { observable, Subject } from "rxjs";
import { catchError, takeUntil, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private token: string;

  constructor(
    private http: HttpService,
    private err: ErrorService,
    private storage: StorageService
  ) {}

  getToken() {
    return this.token;
  }

  register(registerPayload: AuthPayload) {
    this.http
      .requestCall(AuthEndPoints.REGISTER, ApiMethod.POST, registerPayload)
      .pipe(
        takeUntil(this.destroy$),
        retry(1),
        catchError((err) => this.http.handleError(err))
      )
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
      .pipe(
        takeUntil(this.destroy$),
        retry(1),
        catchError((err) => this.http.handleError(err))
      )
      .subscribe(
        (res: any) => {
          this.token = res.token;
          console.log(this.token);
          this.err.userNotification(200, "successfully logged in");
        },
        (error) => console.log(error)
      );
  }
}
