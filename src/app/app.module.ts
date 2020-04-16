import { MatMenuModule } from "@angular/material/menu";
import { CoreModule } from "./core/core.module";
import { MdComponentsModule } from "./core/modules/md-components/md-components.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { LayoutsModule } from "./shared/layouts/layouts.module";
import { MainMenuComponent } from "./shared/main-menu/main-menu.component";

@NgModule({
  declarations: [AppComponent, MainMenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LayoutsModule,
    BrowserAnimationsModule,
    MdComponentsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
