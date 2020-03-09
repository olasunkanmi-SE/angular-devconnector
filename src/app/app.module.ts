import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { PlansComponent } from './plans/plans.component';
import { PlanListComponent } from './plans/plan-list/plan-list.component';
import { PlanDetailComponent } from './plans/plan-detail/plan-detail.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SearchComponent, PlansComponent, PlanListComponent, PlanDetailComponent],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
