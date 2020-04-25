import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { MdComponentsModule } from "src/app/shared/components/md-components/md-components.module";
import { SharedModule } from "./../../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MdComponentsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
