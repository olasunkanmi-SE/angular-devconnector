import { MdComponentsModule } from "src/app/shared/components/md-components/md-components.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PostRoutingModule } from "./post-routing.module";
import { PostComponent } from "./post.component";

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    FontAwesomeModule,
    MdComponentsModule,
  ],
  exports: [PostComponent],
})
export class PostModule {}
