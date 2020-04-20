import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { MdComponentsModule } from "./md-components/md-components.module";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MdComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [MainMenuComponent, FooterComponent],
  exports: [MainMenuComponent, FooterComponent, CommonModule],
})
export class SharedModule {}
