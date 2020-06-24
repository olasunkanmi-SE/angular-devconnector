import { HttpService } from "./../services/http/http.service";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private httpservice: HttpService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError((error) => this.httpservice.handleError(error)));
  }
}
