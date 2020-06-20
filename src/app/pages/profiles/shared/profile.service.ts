import { takeUntil } from "rxjs/operators";
import { environment } from "./../../../../environments/environment";
import { Profile } from "./../model/profile";
import { Subject } from "rxjs";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  backendURL = environment.backendAPI;
  destroy$: Subject<boolean> = new Subject<boolean>();
  profile: Profile;
  profiles: Profile[];
  constructor(private http: HttpClient) {}

  createProfile$(profile: Profile) {
    return this.http
      .post<Profile>(`${this.backendURL}/profiles/createupdate`, profile)
      .pipe(takeUntil(this.destroy$));
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
