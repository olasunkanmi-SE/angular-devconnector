import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfilesComponent } from "./profiles.component";

const routes: Routes = [
  { path: "", component: ProfilesComponent },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
