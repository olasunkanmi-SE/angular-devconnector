import { Plan } from "./plan";
import { Injectable, EventEmitter, Output } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PlanService {
  private plans: Plan[] = [
    {
      id: 1,
      plan_name: "AT&T Unlimited StarterSM",
      number_of_lines: 4,
      monthly_charge_per_line: 140,
      charge_per_line: 65,
      plan_details: {
        first:
          "Unlimited talk, text & data in the US, Mexico & Canada AT&T may slow data speeds when the network is busy. Roaming may be at 2G speed.",
        second: "Spam and fraud alerts",
        third: "Unlimited text from the US to 120+ countries"
      }
    },
    {
      id: 2,
      plan_name: "AT&T Unlimited ExtraSM",
      number_of_lines: 5,
      monthly_charge_per_line: 160,
      charge_per_line: 40,
      plan_details: {
        first:
          "Unlimited talk, text & data in the US, Mexico & Canada AT&T may slow data speeds when the network is busy. Roaming may be at 2G speed."
      }
    },
    {
      id: 3,
      plan_name: "AT&T Unlimited EliteSM",
      number_of_lines: 7,
      monthly_charge_per_line: 200,
      charge_per_line: 50,
      plan_details: {
        first: "America's best network",
        second:
          "Unlimited talk, text & data in the US, Mexico & Canada AT&T may slow data speeds when the network is busy. Roaming may be at 2G speed.",
        third:
          "HBO® included - at no extra charge Video may be ltd to SD. Requires compatible device & activating HBO at www.att.com/myatt. Content, programming and channels subject to change."
      }
    }
  ];
  @Output() linesToggle = new EventEmitter<Plan>();

  constructor() {}
  allPlans() {
    return this.plans;
  }

  handleLinesToggle(plan: Plan) {
    this.linesToggle.emit(plan);
  }

  getPlan(id: number) {
    const plan = this.plans.find(plan => {
      plan.id === id;
    });
    return plan;
  }

  getPlanById(id: number) {
    this.getPlan(id);
  }

  updatePlanById(id: number, updatedPlan: Plan) {
    const plan = this.plans.find(plan => {
      plan.id === id;
    });
    if (plan) {
      plan.plan_name = updatedPlan.plan_name;
      plan.number_of_lines = updatedPlan.number_of_lines;
      plan.monthly_charge_per_line = updatedPlan.monthly_charge_per_line;
      plan.charge_per_line = updatedPlan.charge_per_line;
      plan.plan_details = updatedPlan.plan_details;
    }
  }
}
