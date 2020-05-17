import { HttpClientModule } from "@angular/common/http";
import { CreatePostModule } from "./create-post/create-post.module";
import { PostListModule } from "./post-list/post-list.module";
import { MdComponentsModule } from "src/app/shared/components/md-components/md-components.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PostsRoutingModule } from "./posts-routing.module";
import { PostsComponent } from "./posts.component";

@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FontAwesomeModule,
    MdComponentsModule,
    PostListModule,
    CreatePostModule,
    HttpClientModule,
  ],
})
export class PostsModule {}
