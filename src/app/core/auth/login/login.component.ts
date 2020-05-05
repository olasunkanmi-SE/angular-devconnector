import { AuthService } from "./../services/auth/auth.service";
import { PatternValidation } from "./../../../shared/helpers/custom-validation";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signInForm;
  hide: boolean = true;
  ValidationErrors: any;
  isLoading: boolean = false;
  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signInForm = this.formbuilder.group({
      email: [
        "",
        [
          Validators.required,
          PatternValidation.patternValidator(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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

  onLogin() {
    new Promise((resolve, reject) => {
      resolve(this.CheckToken());
    }).then(this.logUserIn());
  }

  CheckToken(): any {
    this.auth.login(this.signInForm.value);
    this.isLoading = true;
  }

  logUserIn(): any {
    setTimeout(() => {
      if (this.auth.getToken()) {
        new Promise((resolve, reject) => {
          resolve(this.router.navigate(["pages/posts"]));
        });
      } else {
        this.isLoading = false;
        return;
      }
    }, 100);
  }

  onClick() {
    this.auth.currentUser();
  }
}
