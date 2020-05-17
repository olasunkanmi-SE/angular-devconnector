import { MdComponentsModule } from "./../../../shared/components/md-components/md-components.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CreatePostRoutingModule } from "./create-post-routing.module";
import { CreatePostComponent } from "./create-post.component";

@NgModule({
  declarations: [CreatePostComponent],
  exports: [CreatePostComponent],
  imports: [
    CommonModule,
    CreatePostRoutingModule,
    FontAwesomeModule,
    MdComponentsModule,
  ],
})
export class CreatePostModule {}
