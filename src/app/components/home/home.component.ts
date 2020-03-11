import { DataService } from "./../../shared/data.service";

import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @Input() post: any;
  constructor(private dataservice: DataService) {}

  ngOnInit() {}
}
