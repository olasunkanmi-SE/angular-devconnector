import { StorageService } from "./../../../core/storage/storage.service";
import { Router } from "@angular/router";
import { AuthService } from "./../../../core/auth/services/auth/auth.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, Subscription } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { faHome } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-main-menu",
  templateUrl: "./main-menu.component.html",
  styleUrls: ["./main-menu.component.css"],
})
export class MainMenuComponent implements OnInit, OnDestroy {
  faUser = faHome;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  menuControl = new FormControl();
  options: string[] = ["One", "Two", "Three"];
  private authListenerSubscription: Subscription;
  userAuthenticated: boolean = false;
  userHandle: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit() {
    new Promise((resolve, reject) => {
      resolve(
        (this.authListenerSubscription = this.authService
          .getAuthStatusListener()
          .subscribe((isAuthenticated) => {
            this.userAuthenticated = isAuthenticated;
          }))
      );
    }).then(this.checkStorage());
    this.userHandle = this.storage.getItem("handle");
  }

  checkStorage(): any {
    if (+this.storage.getItem("expiration") > Date.now()) {
      return (this.userAuthenticated = true);
    }
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubscription.unsubscribe();
  }
}
