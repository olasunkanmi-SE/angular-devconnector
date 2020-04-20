import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  menuControl = new FormControl();
  options: String[] = ["one", "two", "three"];

  constructor() {}

  ngOnInit() {}
}
