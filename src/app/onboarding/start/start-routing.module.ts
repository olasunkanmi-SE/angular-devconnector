import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StartComponent } from "./start.component";

const routes: Routes = [
  { path: "", component: StartComponent },
  {
    path: "info",
    loadChildren: () => import("./info/info.module").then((m) => m.InfoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartRoutingModule {}
