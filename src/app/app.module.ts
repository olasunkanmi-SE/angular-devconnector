import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MissioncontrolComponent } from './p-c-c-via-service/missioncontrol/missioncontrol.component';
import { AstronautComponent } from './p-c-c-via-service/astronaut/astronaut.component';

@NgModule({
  declarations: [AppComponent, MissioncontrolComponent, AstronautComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
