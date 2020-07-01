import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OnboardingComponent } from "./onboarding.component";

const routes: Routes = [
  { path: "", component: OnboardingComponent },
  {
    path: "info",
    loadChildren: () => import("./info/info.module").then((m) => m.InfoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
