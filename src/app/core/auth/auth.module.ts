import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { MdComponentsModule } from "src/app/shared/md-components/md-components.module";
import { SharedModule } from "./../../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [LoginComponent, SignupComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule, MdComponentsModule, SharedModule],
})
export class AuthModule {}
