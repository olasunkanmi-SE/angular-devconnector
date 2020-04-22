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
  matcher;

  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.signUpForm = this.formbuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(7)]],
      repeat_password: ["", Validators.required],
    });
  }

  get email() {
    return this.signUpForm.get("email");
  }

  get name() {
    return this.signUpForm.get("name");
  }

  onSubmit() {
    const x = this.signUpForm.get("email").value;
    console.log(`User Data: ${x}`);
    this.signUpForm.reset();
  }
}
