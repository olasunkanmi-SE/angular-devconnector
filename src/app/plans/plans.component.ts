import { PlanService } from "./../shared/plan.service";
import { Plan } from "./../shared/plan";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-plans",
  templateUrl: "./plans.component.html",
  styleUrls: ["./plans.component.css"]
})
export class PlansComponent implements OnInit {
  plans: Plan[];
  constructor(private planservice: PlanService) {
    this.plans = this.planservice.allPlans();
  }

  ngOnInit() {}
}
