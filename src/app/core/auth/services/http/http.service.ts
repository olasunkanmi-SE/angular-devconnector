import { ApiMethod, AuthEndPoints } from "./consts";
import { ErrorService } from "./../error/error.service";
import { environment } from "./../../../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { Store } from "@ngrx/store";
import * as UI from "../../../../shared/store/action/ui.actions";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  methods: ApiMethod;
  constructor(
    private http: HttpClient,
    private errorservice: ErrorService,
    private store: Store
  ) {}
  /**
   * make API calls with this function *
   * @param method
   * @param api
   * @param payLoad
   */

  requestCall(api: AuthEndPoints, method: ApiMethod, payLoad?: any) {
    let response;

    switch (method) {
      case ApiMethod.GET:
        response = this.http.get(`${environment.backendAPI}${api}`);
        break;
      case ApiMethod.POST:
        response = this.http.post(`${environment.backendAPI}${api}`, payLoad);
        break;
      case ApiMethod.PUT:
        response = this.http.put(`${environment.backendAPI}${api}`, payLoad);
        break;
      case ApiMethod.DELETE:
        response = this.http.delete(`${environment.backendAPI}${api}`);
      default:
        break;
    }
    return response;
  }

  handleError(err: HttpErrorResponse) {
    let displayerror;
    let feedback: string | {};
    if (err.error instanceof ErrorEvent) {
      console.error(`An error occured: ${err.error.message}`);
    } else {
      this.store.dispatch(new UI.StopLoading());
      this.errorservice.whichError(err.status, err.error);
    }
    return throwError(err);
  }
}
