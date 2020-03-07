import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isLoggedIn = false;

  logIn() {
    return (this.isLoggedIn = true);
  }

  logOut() {
    return (this.isLoggedIn = false);
  }

  checkUserAuth() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn);
      }, 4000);
    });
    return promise;
  }

  constructor() {}
}
