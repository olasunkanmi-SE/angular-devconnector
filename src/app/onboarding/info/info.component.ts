import { AuthService } from "./../../core/auth/services/auth/auth.service";
import { Router } from "@angular/router";
import { StorageService } from "./../../core/storage/storage.service";
import { Subscription } from "rxjs";
import { ProfileService } from "./../../pages/profiles/shared/profile.service";
import { Country, UserStatus } from "./../../shared/model/info";
import { InfoService } from "./../../shared/info.service";
import { PatternValidation } from "./../../shared/helpers/custom-validation";
import { FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Profile } from "src/app/pages/profiles/model/profile";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.css"],
})
export class InfoComponent implements OnInit, OnDestroy {
  infoForm;
  locations: Country[];
  statuses: UserStatus[];
  profileSub: Subscription;
  profile: Profile;
  currentUserSub: Subscription;
  username: string;
  constructor(
    private formBuilder: FormBuilder,
    private info: InfoService,
    private profileService: ProfileService,
    private storage: StorageService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.locations = this.info.countries;
    this.statuses = this.info.status;
    this.getCurrentUser();
  }

  initializeForm() {
    this.infoForm = this.formBuilder.group({
      handle: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      company: ["", [Validators.maxLength(40), Validators.minLength(2)]],
      status: ["", [Validators.required]],
      website: [
        "",
        PatternValidation.patternValidator(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          { hasSpecialCharacter: true }
        ),
      ],
      skills: ["", [Validators.required]],
      location: ["", [Validators.required]],
      bio: [""],
      githubusername: [
        "",
        PatternValidation.patternValidator(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          { hasSpecialCharacter: true }
        ),
      ],
    });
  }

  get handle() {
    return this.infoForm.get("handle");
  }

  get company() {
    return this.infoForm.get("company");
  }

  get status() {
    return this.infoForm.get("status");
  }

  get website() {
    return this.infoForm.get("website");
  }

  get skills() {
    return this.infoForm.get("skills");
  }

  get location() {
    return this.infoForm.get("skills");
  }

  get bio() {
    return this.infoForm.get("bio");
  }

  get githubusername() {
    return this.infoForm.get("githubusername");
  }

  createProfile() {
    this.profileSub = this.profileService
      .createProfile$(this.infoForm.value)
      .subscribe((res) => {
        this.profile = res;
        this.storage.saveItem("handle", this.profile.handle);
        this.router.navigate(["pages/posts"]);
      });
  }

  getCurrentUser() {
    this.currentUserSub = this.auth.currentUser$().subscribe((res: any) => {
      this.username = res.firstname;
    });
  }

  ngOnDestroy(): void {
    if (this.profileSub) {
      this.profileSub.unsubscribe();
      this.currentUserSub.unsubscribe();
    }
  }
}
