import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppCoreRoutingModule } from "./app-core-routing.module";
import { AppCoreComponent } from "./app-core.component";

@NgModule({
  declarations: [AppCoreComponent],
  imports: [CommonModule, AppCoreRoutingModule],
})
export class AppCoreModule {}
