import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreatePostRoutingModule } from "./create-post-routing.module";
import { CreatePostComponent } from "./create-post.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MdComponentsModule } from "./../../../shared/components/md-components/md-components.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { StoreModule } from "@ngrx/store";
import { createPostReducer } from "../create-post/create-post.reducer";

@NgModule({
  declarations: [CreatePostComponent],
  exports: [CreatePostComponent],
  imports: [
    CommonModule,
    CreatePostRoutingModule,
    FontAwesomeModule,
    MdComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature("createpost", createPostReducer),
  ],
})
export class CreatePostModule {}
