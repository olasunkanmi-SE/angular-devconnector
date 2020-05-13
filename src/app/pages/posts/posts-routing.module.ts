import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PostsComponent } from "./posts.component";

const routes: Routes = [
  { path: "", component: PostsComponent },
  {
    path: "post-list",
    loadChildren: () =>
      import("./post-list/post-list.module").then((m) => m.PostListModule),
  },
  {
    path: "create-post",
    loadChildren: () =>
      import("./create-post/create-post.module").then(
        (m) => m.CreatePostModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
