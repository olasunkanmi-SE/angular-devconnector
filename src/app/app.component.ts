import { AuthService } from "./core/auth/services/auth/auth.service";
import { StorageService } from "./core/storage/storage.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(
    private storage: StorageService,
    private authservice: AuthService
  ) {}

  ngOnInit() {}
}
