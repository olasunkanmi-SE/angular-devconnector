import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [CommonModule],
})
export class LayoutsModule {}
