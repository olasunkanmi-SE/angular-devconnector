import { Injectable } from "@angular/core";
import { Key } from "protractor";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  saveToken(token: string): void {
    localStorage.setItem("jwt_token", token);
  }

  getToken() {
    return localStorage.getItem("jwt_token");
  }

  removeToken(): void {
    localStorage.removeItem("$token");
  }

  saveItem(alias: string, item: any): void {
    localStorage.setItem(alias, item);
  }

  getItem(alias: string) {
    return localStorage.getItem(alias);
  }

  removeItem(alias: string): void {
    localStorage.removeItem(alias);
  }

  setLocalObject(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalObject(key: string) {
    const localObject = localStorage.getItem(key);
    return JSON.parse(localObject);
  }

  removeLocalObject(key: string): void {
    return localStorage.removeItem(key);
  }
}
