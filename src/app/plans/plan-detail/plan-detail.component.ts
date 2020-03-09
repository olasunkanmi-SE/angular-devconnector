import { Component, OnInit } from "@angular/core";
import { faMobile, faCheck } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-plan-detail",
  templateUrl: "./plan-detail.component.html",
  styleUrls: ["./plan-detail.component.css"]
})
export class PlanDetailComponent implements OnInit {
  faMobile = faMobile;
  faCheck = faCheck;

  constructor() {}

  ngOnInit() {}
}
