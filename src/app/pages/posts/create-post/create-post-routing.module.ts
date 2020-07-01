import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CreatePostComponent } from "./create-post.component";

const routes: Routes = [{ path: "", component: CreatePostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePostRoutingModule {}
