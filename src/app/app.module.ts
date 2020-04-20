
import { SharedModule } from "./shared/shared.module";
import { MdComponentsModule } from "./shared/md-components/md-components.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdComponentsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {}
