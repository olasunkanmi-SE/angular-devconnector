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

  @Input() plan: any;
  newPlan_name: string;
  newNumber_of_lines: number;
  newMonthly_charge_per_line: number;
  newCharge_per_line: number[] = [65, 60, 45, 35];
  monthly_charge: number[] = [65, 120, 125, 140];
  newCharge_per_line_other: number[] = [75, 65, 50, 40];
  monthly_chargexExtra: number[] = [75, 130, 150, 160];
  newCharge_per_line_others: number[] = [85, 75, 60, 50];

  constructor(private planservice: PlanService) {}

  getLineToToggle() {
    this.planservice.handleLinesToggle(this.plan);
  }

  handleLinesIncrement() {
    this.getLineToToggle();
    this.plan.number_of_lines += 1;
    if (this.plan.id == 1) {
      switch (this.plan.number_of_lines) {
        case 1:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line[0],
            monthly_charge_per_line: this.monthly_charge[0]
          });
          this.plan.charge_per_line = this.newCharge_per_line[0];
          this.plan.monthly_charge_per_line = this.monthly_charge[0];
          break;
        case 2:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line[1],
            monthly_charge_per_line: this.monthly_charge[1]
          });
          this.plan.charge_per_line = this.newCharge_per_line[1];
          this.plan.monthly_charge_per_line = this.monthly_charge[1];
          break;
        case 3:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line[2],
            monthly_charge_per_line: this.monthly_charge[2]
          });
          this.plan.charge_per_line = this.newCharge_per_line[2];
          this.plan.monthly_charge_per_line = this.monthly_charge[2];
          break;
        case 4:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line[3],
            monthly_charge_per_line: this.monthly_charge[3]
          });
          this.plan.charge_per_line = this.newCharge_per_line[3];
          this.plan.monthly_charge_per_line = this.monthly_charge[3];
          break;

        default:
          break;
      }
    } else if (this.plan.id == 2) {
      switch (this.plan.number_of_lines) {
        case 1:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_other[0],
            monthly_charge_per_line: this.monthly_charge[0]
          });
          this.plan.charge_per_line = this.newCharge_per_line_other[0];
          this.plan.monthly_charge_per_line = this.monthly_charge[0];
          break;
        case 2:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_other[1],
            monthly_charge_per_line: this.monthly_charge[1]
          });
          this.plan.charge_per_line = this.newCharge_per_line_other[1];
          this.plan.monthly_charge_per_line = this.monthly_charge[1];
          break;
        case 3:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_other[2],
            monthly_charge_per_line: this.monthly_charge[2]
          });
          this.plan.charge_per_line = this.newCharge_per_line_other[2];
          this.plan.monthly_charge_per_line = this.monthly_charge[2];
          break;
        case 4:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_other[3],
            monthly_charge_per_line: this.monthly_charge[3]
          });
          this.plan.charge_per_line = this.newCharge_per_line_other[3];
          this.plan.monthly_charge_per_line = this.monthly_charge[3];
          break;

        default:
          break;
      }
    } else {
      switch (this.plan.number_of_lines) {
        case 1:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_others[0],
            monthly_charge_per_line: this.monthly_charge[0]
          });
          this.plan.charge_per_line = this.newCharge_per_line_others[0];
          this.plan.monthly_charge_per_line = this.monthly_charge[0];
          break;
        case 2:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_others[1],
            monthly_charge_per_line: this.monthly_charge[1]
          });
          this.plan.charge_per_line = this.newCharge_per_line_others[1];
          this.plan.monthly_charge_per_line = this.monthly_charge[1];
          break;
        case 3:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_others[2],
            monthly_charge_per_line: this.monthly_charge[2]
          });
          this.plan.charge_per_line = this.newCharge_per_line_others[2];
          this.plan.monthly_charge_per_line = this.monthly_charge[2];
          break;
        case 4:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_others[3],
            monthly_charge_per_line: this.monthly_charge[3]
          });
          this.plan.charge_per_line = this.newCharge_per_line_others[3];
          this.plan.monthly_charge_per_line = this.monthly_charge[3];
          break;

        default:
          break;
      }
    }
  }

  handleLinesDecrement() {
    this.getLineToToggle();
    this.plan.number_of_lines -= 1;
    if (this.plan.id == 1) {
      switch (this.plan.number_of_lines) {
        case 1:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line[0],
            monthly_charge_per_line: this.monthly_charge[0]
          });
          this.plan.charge_per_line = this.newCharge_per_line[0];
          this.plan.monthly_charge_per_line = this.monthly_charge[0];
          break;
        case 2:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line[1],
            monthly_charge_per_line: this.monthly_charge[1]
          });
          this.plan.charge_per_line = this.newCharge_per_line[1];
          this.plan.monthly_charge_per_line = this.monthly_charge[1];
          break;
        case 3:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line[2],
            monthly_charge_per_line: this.monthly_charge[2]
          });
          this.plan.charge_per_line = this.newCharge_per_line[2];
          this.plan.monthly_charge_per_line = this.monthly_charge[2];
          break;
        case 4:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line[3],
            monthly_charge_per_line: this.monthly_charge[3]
          });
          this.plan.charge_per_line = this.newCharge_per_line[3];
          this.plan.monthly_charge_per_line = this.monthly_charge[3];
          break;

        default:
          break;
      }
    } else if (this.plan.id == 2) {
      switch (this.plan.number_of_lines) {
        case 1:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_other[0],
            monthly_charge_per_line: this.monthly_charge[0]
          });
          this.plan.charge_per_line = this.newCharge_per_line_other[0];
          this.plan.monthly_charge_per_line = this.monthly_charge[0];
          break;
        case 2:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_other[1],
            monthly_charge_per_line: this.monthly_charge[1]
          });
          this.plan.charge_per_line = this.newCharge_per_line_other[1];
          this.plan.monthly_charge_per_line = this.monthly_charge[1];
          break;
        case 3:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_other[2],
            monthly_charge_per_line: this.monthly_charge[2]
          });
          this.plan.charge_per_line = this.newCharge_per_line_other[2];
          this.plan.monthly_charge_per_line = this.monthly_charge[2];
          break;
        case 4:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_other[3],
            monthly_charge_per_line: this.monthly_charge[3]
          });
          this.plan.charge_per_line = this.newCharge_per_line_other[3];
          this.plan.monthly_charge_per_line = this.monthly_charge[3];
          break;

        default:
          break;
      }
    } else {
      switch (this.plan.number_of_lines) {
        case 1:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_others[0],
            monthly_charge_per_line: this.monthly_charge[0]
          });
          this.plan.charge_per_line = this.newCharge_per_line_others[0];
          this.plan.monthly_charge_per_line = this.monthly_charge[0];
          break;
        case 2:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_others[1],
            monthly_charge_per_line: this.monthly_charge[1]
          });
          this.plan.charge_per_line = this.newCharge_per_line_others[1];
          this.plan.monthly_charge_per_line = this.monthly_charge[1];
          break;
        case 3:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_others[2],
            monthly_charge_per_line: this.monthly_charge[2]
          });
          this.plan.charge_per_line = this.newCharge_per_line_others[2];
          this.plan.monthly_charge_per_line = this.monthly_charge[2];
          break;
        case 4:
          this.planservice.updatePlanById(this.plan.id, {
            charge_per_line: this.newCharge_per_line_others[3],
            monthly_charge_per_line: this.monthly_charge[3]
          });
          this.plan.charge_per_line = this.newCharge_per_line_others[3];
          this.plan.monthly_charge_per_line = this.monthly_charge[3];
          break;

        default:
          break;
      }
    }
  }

  ngOnInit() {}
}
