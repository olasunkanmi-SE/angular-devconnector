import { Title } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "blog";
  customers = {
    name: "Ola",
    email: "xyz",
  };
  constructor() {
    this.customers;
  }

  ngOnInit() {}
}
