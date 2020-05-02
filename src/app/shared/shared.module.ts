import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./components/footer/footer.component";
import { MainMenuComponent } from "./components/main-menu/main-menu.component";
import { MdComponentsModule } from "./components/md-components/md-components.module";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorComponent } from "./components/error/error.component";

@NgModule({
  imports: [
    CommonModule,
    MdComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [MainMenuComponent, FooterComponent, ErrorComponent],
  exports: [MainMenuComponent, FooterComponent, CommonModule],
})
export class SharedModule {}
