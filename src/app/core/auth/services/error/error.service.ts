import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Location } from "@angular/common";

export enum CustomErrorCode {
  UN_KNOWN = 0,
}

export enum RedirectionCode {
  HTTP_300_MULTIPLE_CHOICE = 300,
  HTTP_301_MOVED_PERMANENTLY = 301,
  HTTP_307_TEMPORARY_REDIRECT = 307,
  HTTP_308_PERMANENT_REDIRECT = 308,
  HTTP_400_BAD_REQUEST = 309,
}

export enum ServerError {
  HTTP_500_INTERNAL_SERVER_ERROR = 500,
  HTTP_501_NOT_IMPLEMENTED = 501,
  HTTP_502_BAD_GATEWAY = 502,
  HTTP_503_SERVICE_UNAVAILABLE = 503,
  HTTP_504_GATEWAY_TIMEOUT = 504,
  HTTP_507_INSUFFICIENT_STORAGE = 507,
}

export enum SuccessCode {
  HTTP_200_OK = 200,
  HTTP_201_CREATED = 201,
  HTTP_202_ACCEPTED = 202,
}

export enum ClientError {
  HTTP_400_BAD_REQUEST = 400,
  HTTP_401_UNAUTHORIZED = 401,
  HTTP_402_PAYMENT_REQUIRED = 402,
  HTTP_403_FORBIDDEN = 403,
  HTTP_404_NOT_FOUND = 404,
  HTTP_408_REQUEST_TIMEOUT = 408,
  HTTP_429_TOO_MANY_REQUESTS = 423,
}

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  userFeedback: any;
  constructor(private _snackBar: MatSnackBar, private location: Location) {}

  openSnackBar(message: string, action: any) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  whichError(errorCode: number, error: string) {
    switch (errorCode) {
      case CustomErrorCode.UN_KNOWN:
        this.openSnackBar("Server is Down", null);
        console.error(error);
        break;
      case ClientError.HTTP_400_BAD_REQUEST:
        this.userFeedback = error;
        this.location.back();
        this.openSnackBar(this.userFeedback, null);
        break;
      case ClientError.HTTP_404_NOT_FOUND:
        this.userFeedback = error;
        this.openSnackBar(this.userFeedback, null);
        break;
      case ClientError.HTTP_401_UNAUTHORIZED:
        this.userFeedback = error;
        this.openSnackBar(this.userFeedback, null);
        break;
      case ClientError.HTTP_408_REQUEST_TIMEOUT:
        this.userFeedback = error;
        this.openSnackBar(this.userFeedback, null);
        break;
      case ServerError.HTTP_500_INTERNAL_SERVER_ERROR:
        this.userFeedback = error;
        this.openSnackBar(this.userFeedback, null);
      default:
        this.openSnackBar("unknown Error Code", null);
        break;
    }
  }

  userNotification(notificationCode: number, notification: string) {
    switch (notificationCode) {
      case SuccessCode.HTTP_200_OK:
        this.openSnackBar(notification, null);
        break;
      case SuccessCode.HTTP_201_CREATED:
        this.openSnackBar(notification, null);
        break;
      case SuccessCode.HTTP_202_ACCEPTED:
        this.openSnackBar(notification, null);
      default:
        this.openSnackBar("unknown success action", null);

        break;
    }
  }
}
