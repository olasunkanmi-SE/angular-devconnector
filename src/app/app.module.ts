import { AuthService } from "./shared/auth.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HomeComponent } from "./home/home.component";
import { ServersComponent } from "./servers/servers.component";
import { UsersComponent } from "./users/users.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { UserComponent } from "./users/user/user.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./shared/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServersComponent,
    UsersComponent,
    EditServerComponent,
    ServerComponent,
    UserComponent,
    UserEditComponent,
    PageNotFoundComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
