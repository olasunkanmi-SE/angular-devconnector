import { ReplyModule } from "./../reply/reply.module";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MdComponentsModule } from "./../../../shared/components/md-components/md-components.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CommentRoutingModule } from "./comment-routing.module";
import { CommentComponent } from "./comment.component";
import { StoreModule } from "@ngrx/store";

@NgModule({
  declarations: [CommentComponent],
  exports: [CommentComponent],
  imports: [
    CommonModule,
    CommentRoutingModule,
    MdComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    ReplyModule,
    // StoreModule.forFeature("posts", commentsReducer),
  ],
})
export class CommentModule {}
