import { ApiMethod, AuthEndPoints } from "./consts";
import { ErrorService } from "./../error/error.service";
import { environment } from "./../../../../../environments/environment.prod";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor() {}
}
