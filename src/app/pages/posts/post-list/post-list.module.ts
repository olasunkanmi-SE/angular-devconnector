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
  ],
})
export class PostListModule {}
