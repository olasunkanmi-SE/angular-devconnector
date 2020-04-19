import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { MdComponentsModule } from "./md-components/md-components.module";

@NgModule({
  imports: [CommonModule, MdComponentsModule, RouterModule],
  declarations: [MainMenuComponent, FooterComponent],
  exports: [MainMenuComponent, FooterComponent, CommonModule],
})
export class SharedModule {}
