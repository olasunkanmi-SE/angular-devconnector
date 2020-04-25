import { AuthService } from "./../services/auth/auth.service";
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
  constructor(private authservice: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //Get the token from authservice
    const authToken = this.authservice.getToken();
    //Clone the request and replace the original headers with cloned headers, updated with the authorization
    const authReq = req.clone({
      headers: req.headers.set("Authorization", authToken),
    });
    //Send cloned request with header to the next handler
    return next.handle(authReq);
  }
}
