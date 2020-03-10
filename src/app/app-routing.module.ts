import { HomeComponent } from "./home/home.component";
import { PlansComponent } from "./plans/plans.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlanComponent } from "./plans/plan/plan.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "plans",
    component: PlansComponent,
    children: [
      {
        path: ":id",
        component: PlanComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
