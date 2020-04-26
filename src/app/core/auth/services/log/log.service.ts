import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LogService {
  logs: any[] = [];

  constructor() {}

  LogHTTPRequests(log: any) {
    this.logs.push(log);
    console.table(this.logs);
  }
}
