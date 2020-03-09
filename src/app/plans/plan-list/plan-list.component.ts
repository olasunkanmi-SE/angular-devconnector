import { PlanService } from "./../../shared/plan.service";
import { Component, OnInit, Input } from "@angular/core";
import { faMobile } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-plan-list",
  templateUrl: "./plan-list.component.html",
  styleUrls: ["./plan-list.component.css"]
})
export class PlanListComponent implements OnInit {
  faMobile = faMobile;
  firstPlan;
  @Input() plan: any;

  constructor(private planservice: PlanService) {}

  ngOnInit() {
    this.firstPlan = this.myPlanById(1);
  }

  myPlanById(id) {
    const plan = this.planservice.getPlanById(id);
    console.log(plan["number_of_lines"]);
  }
}
