import { CommentModule } from "./../comment/comment.module";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MdComponentsModule } from "./../../../shared/components/md-components/md-components.module";
import { PostListComponent } from "./post-list.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostListRoutingModule } from "./post-list-routing.module";

@NgModule({
  declarations: [PostListComponent],
  exports: [PostListComponent],
  imports: [
    CommonModule,
    PostListRoutingModule,
    MdComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    CommentModule,
  ],
})
export class PostListModule {}
