import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreatePostRoutingModule } from "./create-post-routing.module";
import { CreatePostComponent } from "./create-post.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MdComponentsModule } from "./../../../shared/components/md-components/md-components.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

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
  ],
})
export class CreatePostModule {}
