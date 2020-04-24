import { StorageService } from "./core/storage/storage.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  govParams: {};
  x: {};
  y: any;
  constructor(private storage: StorageService) {
    this.govParams = {
      params: {
        statusCode: 0,
        paid: false,
      },
    };
    const mystate = 5;

    this.storage.setLocalObject("govparams", this.govParams);
    this.x = this.storage.getLocalObject("govparams");
    this.y = this.storage.saveItem("state", mystate);
    console.log(this.x);
  }

  ngOnInit() {}
}
