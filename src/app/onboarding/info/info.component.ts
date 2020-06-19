import { Country, UserStatus } from "./../../shared/model/info";
import { InfoService } from "./../../shared/info.service";
import { PatternValidation } from "./../../shared/helpers/custom-validation";
import { FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.css"],
})
export class InfoComponent implements OnInit {
  infoForm;
  locations: Country[];
  statuses: UserStatus[];
  constructor(private formBuilder: FormBuilder, private info: InfoService) {}

  ngOnInit() {
    this.initializeForm();
    this.locations = this.info.countries;
    this.statuses = this.info.status;
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
      githubusername: [""],
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
}
