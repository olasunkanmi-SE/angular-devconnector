import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "./../environments/environment.prod";
import { OnboardingModule } from "./onboarding/onboarding.module";
import { PostsModule } from "./pages/posts/posts.module";
import { LoggingInterceptor } from "./core/auth/interceptors/logging-interceptor";
import { ErrorInterceptor } from "./core/auth/interceptors/error-interceptor";
import { AuthInterceptor } from "./core/auth/interceptors/auth-interceptor";
import { SharedModule } from "./shared/shared.module";
import { MdComponentsModule } from "./shared/components/md-components/md-components.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomeModule } from "./pages/home/home.module";
import { reducers } from "./app.reducer";
import { StoreModule } from "@ngrx/store";
import { storageReducer } from "./shared/store/storage.metareducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdComponentsModule,
    SharedModule,
    HttpClientModule,
    PostsModule,
    HomeModule,
    OnboardingModule,
    StoreModule.forRoot(reducers, { metaReducers: [storageReducer] }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
