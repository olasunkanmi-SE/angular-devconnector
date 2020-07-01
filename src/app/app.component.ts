import { AuthService } from "./core/auth/services/auth/auth.service";
import { StorageService } from "./core/storage/storage.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private authservice: AuthService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.authservice.autoAuthenticateUser();
    this.storage.getItem("handle");
  }
}
