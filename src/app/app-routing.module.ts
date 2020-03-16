import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ChildGuard } from "./shared/child.guard"; //Guard only the child routes
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/auth.guard"; //Guard all the whole route

const appRoute: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [
      { path: ":id", component: UserComponent },
      { path: ":id/edit", component: UserEditComponent }
    ]
  },
  {
    path: "servers",
    canActivateChild: [ChildGuard],
    component: ServersComponent,
    children: [
      { path: ":id", component: ServerComponent },
      {
        path: ":id/edit",
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  {
    path: "page-not-found",
    component: PageNotFoundComponent
  },
  {
    path: "**",
    redirectTo: "/page-not-found"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
