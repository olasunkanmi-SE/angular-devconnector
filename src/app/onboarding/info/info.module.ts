import { MdComponentsModule } from "src/app/shared/components/md-components/md-components.module";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InfoRoutingModule } from "./info-routing.module";
import { InfoComponent } from "./info.component";

@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    InfoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MdComponentsModule,
  ],
})
export class InfoModule {}
