import { AuthService } from "./../services/auth/auth.service";
import { StorageService } from "./../../storage/storage.service";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private storage: StorageService,
    private authservice: AuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //Get the token from authservice
    const authToken = localStorage.getItem("token");
    console.log(authToken);
    if (authToken) {
      //Clone the request and replace the original headers with cloned headers, updated with the authorization
      const authRequest = req.clone({
        setHeaders: { Authorization: authToken },
      });
      //Send cloned request with header to the next handler
      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }
}
