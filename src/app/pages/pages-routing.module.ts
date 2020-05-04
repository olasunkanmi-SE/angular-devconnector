import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from "./pages.component";

const routes: Routes = [
  { path: "", component: PagesComponent },
  {
    path: "posts",
    loadChildren: () =>
      import("./posts/posts.module").then((m) => m.PostsModule),
  },
  {
    path: "profiles",
    loadChildren: () =>
      import("./profiles/profiles.module").then((m) => m.ProfilesModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
  },
  {
    path: "post",
    loadChildren: () => import("./post/post.module").then((m) => m.PostModule),
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
