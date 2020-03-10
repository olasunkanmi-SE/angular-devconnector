import { PlanService } from "./../../shared/plan.service";
import { Component, OnInit, Input } from "@angular/core";
import {
  faMobile,
  faCheck,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import { Plan } from "src/app/shared/plan";

@Component({
  selector: "app-plan-detail",
  templateUrl: "./plan-detail.component.html",
  styleUrls: ["./plan-detail.component.css"]
})
export class PlanDetailComponent implements OnInit {
  @Input() plan;
  faMobile = faMobile;
  faCheck = faCheck;
  faShoppingCart = faShoppingCart;

  constructor(private planservice: PlanService) {
    this.planservice.getPlanById(this.plan);
    console.log(this.plan);
  }

  ngOnInit() {}
}
