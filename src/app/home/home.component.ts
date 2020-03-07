import { AuthService } from "./../shared/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private authservice: AuthService) {}

  OnLoadServers() {
    this.router.navigate(["/servers"]);
  }

  logIn() {
    this.authservice.logIn();
  }

  logOut() {
    this.authservice.logOut();
  }

  ngOnInit() {}
}
