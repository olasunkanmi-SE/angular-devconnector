import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UiService {
  loadinStateChange: Subject<boolean> = new Subject<boolean>();

  constructor() {}
}
