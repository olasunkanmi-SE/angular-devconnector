import { AuthGuardGuard } from "src/app/core/auth/guards/auth-guard.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./core/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "pages",
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "onboarding",
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import("./onboarding/onboarding.module").then((m) => m.OnboardingModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
