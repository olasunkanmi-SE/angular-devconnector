import { Injectable } from "@angular/core";

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
  constructor() {}

  whichError(errorCode: number, error: string) {
    switch (errorCode) {
      case CustomErrorCode.UN_KNOWN:
        console.log("Server is Down");
        console.error(error);
        break;
      case ClientError.HTTP_400_BAD_REQUEST:
        this.userFeedback = error;
        alert(this.userFeedback);
        break;
      case ClientError.HTTP_404_NOT_FOUND:
        this.userFeedback = error;
        alert(this.userFeedback);
        break;
      case ClientError.HTTP_401_UNAUTHORIZED:
        this.userFeedback = error;
        alert(this.userFeedback);
        break;
      case ClientError.HTTP_408_REQUEST_TIMEOUT:
        this.userFeedback = error;
        alert(this.userFeedback);
        break;
      default:
        console.log("unknown Error Code");
        break;
    }
  }

  userNotification(notificationCode: number, notification: string) {
    switch (notificationCode) {
      case SuccessCode.HTTP_200_OK:
        console.log(notification);
        break;
      case SuccessCode.HTTP_201_CREATED:
        console.log(notification);
        break;
      case SuccessCode.HTTP_202_ACCEPTED:
        console.log(notification);
      default:
        console.log("unknown success action");
        break;
    }
  }
}
