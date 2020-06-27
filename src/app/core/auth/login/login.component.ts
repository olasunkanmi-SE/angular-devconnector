
import { Observable } from "rxjs";
import { StorageService } from "./../../storage/storage.service";
import { AuthService } from "./../services/auth/auth.service";
import { PatternValidation } from "./../../../shared/helpers/custom-validation";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../../app.reducer";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signInForm;
  hide: boolean = true;
  ValidationErrors: any;

  isLoading$: Observable<boolean>;
  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private storage: StorageService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    if (+this.storage.getItem("expiration") > Date.now()) {
      return this.router.navigate(["pages/posts"]);
    }
    this.signInForm = this.formbuilder.group({
      email: [
        "",
        [
          Validators.required,
          PatternValidation.patternValidator(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
            { hasEmail: true }
          ),
        ],
      ],
      password: ["", [Validators.required]],
    });
    // this.onChanges();
  }

  get email() {
    return this.signInForm.get("email");
  }

  get password() {
    return this.signInForm.get("password");
  }

  // onChanges() {
  //   this.signInForm.valueChanges.subscribe((data) => console.log(data));
  // }

  onLogin(): any {
    this.auth.login(this.signInForm.value);
    this.isLoading = true;
  }

  onClick() {
    this.auth.currentUser$();
  }
}
