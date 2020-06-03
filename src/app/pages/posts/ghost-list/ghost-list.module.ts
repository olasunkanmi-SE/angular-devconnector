import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MdComponentsModule } from "./../../../shared/components/md-components/md-components.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GhostListRoutingModule } from "./ghost-list-routing.module";
import { GhostListComponent } from "./ghost-list.component";

@NgModule({
  declarations: [GhostListComponent],
  imports: [
    CommonModule,
    GhostListRoutingModule,
    MdComponentsModule,
    FontAwesomeModule,
  ],
  exports: [GhostListComponent],
})
export class GhostListModule {}
