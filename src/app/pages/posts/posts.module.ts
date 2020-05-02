import { MdComponentsModule } from "src/app/shared/components/md-components/md-components.module";
import { PostModule } from "./../post/post.module";
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
    PostModule,
    MdComponentsModule,
  ],
})
export class PostsModule {}
