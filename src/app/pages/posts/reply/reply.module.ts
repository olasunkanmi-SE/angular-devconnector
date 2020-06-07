import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MdComponentsModule } from "src/app/shared/components/md-components/md-components.module";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReplyRoutingModule } from "./reply-routing.module";
import { ReplyComponent } from "./reply.component";

@NgModule({
  declarations: [ReplyComponent],
  exports: [ReplyComponent],
  imports: [
    CommonModule,
    ReplyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MdComponentsModule,
    FontAwesomeModule,
  ],
})
export class ReplyModule {}
