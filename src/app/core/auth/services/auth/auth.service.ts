import { ApiMethod, AuthEndPoints } from "./../http/consts";
import { StorageService } from "./../../../storage/storage.service";
import { AuthPayload, registerPayload } from "./../../interfaces/auth";
import { ErrorService } from "./../error/error.service";
import { HttpService } from "./../http/http.service";
import { Injectable } from "@angular/core";
import { observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpService,
    private err: ErrorService,
    private storage: StorageService
  ) { }

  register(loginPayload: AuthPayload) {
    this.http
      .requestCall(
        AuthEndPoints.REGISTER,
        ApiMethod.POST,
        this.destroy$,
        loginPayload
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.err.userNotification(201, "registration successful");
        },
        (error) => {
          console.log(error);
        }
      );
  }


}
