import { Subscription } from "rxjs";
import { ProfileService } from "./../shared/profile.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Profile } from "../model/profile";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileSub: Subscription;
  userProfile: Profile;
  constructor(private profileService: ProfileService) {
    this.getUserProfile();
  }

  ngOnInit() {}

  getUserProfile() {
    this.profileSub = this.profileService
      .getCurrentUserProfile$()
      .subscribe((res) => {
        this.userProfile = res;
        console.log(this.userProfile);
      });
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe();
  }
}
