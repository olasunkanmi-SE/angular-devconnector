import { Router } from "@angular/router";
import { AuthService } from "./../services/auth/auth.service";
import { PatternValidation } from "../../../shared/helpers/custom-validation";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  menuControl = new FormControl();
  options: String[] = ["one", "two", "three"];
  signUpForm;

  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = this.formbuilder.group(
      {
        firstname: [
          "",
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        lastname: [
          "",
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
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
        password: [
          "",
          [
            Validators.required,
            PatternValidation.patternValidator(/\d/, { hasNumber: true }),
            PatternValidation.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            PatternValidation.patternValidator(/[a-z]/, { hasSmallCase: true }),
            PatternValidation.patternValidator(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              { hasSpecialCharacter: true }
            ),
          ],
        ],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: PatternValidation.passwordMatchValidator,
      }
    );
    // this.onChanges();
  }

  get email() {
    return this.signUpForm.get("email");
  }


  get firstname() {
    return this.signUpForm.get("firstname");
  }

  get lastname() {
    return this.signUpForm.get("lastname");

  }

  get password() {
    return this.signUpForm.get("password");
  }

  get confirmPassword() {
    return this.signUpForm.get("confirmPassword");
  }

  // onChanges(): void {
  //   this.signUpForm.get("email").valueChanges.subscribe((data) => {
  //     this.auth.register(this.signUpForm.value);
  //   });
  // }

  onSubmit() {
    this.auth.register(this.signUpForm.value);
    this.router.navigate(["auth/login"]);
    this.signUpForm.reset();
  }
}
