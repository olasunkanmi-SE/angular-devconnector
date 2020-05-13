import { Router } from "@angular/router";
import { StorageService } from "./../../core/storage/storage.service";
import { AuthService } from "./../../core/auth/services/auth/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { faUserCircle, faFeather } from "@fortawesome/free-solid-svg-icons";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
  faUser = faUserCircle;
  faFeather = faFeather;
  authListenerSubscription: Subscription;
  userAuthenticated: boolean = false;

  constructor(
    private authservice: AuthService,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    new Promise((resolve, reject) => {
      this.authservice.getIsAuthenticated();
      this.authListenerSubscription = this.authservice
        .getAuthStatusListener()
        .subscribe((isAuthenticated) => {
          this.userAuthenticated = isAuthenticated;
        });
    }).then(this.checkStorage());
  }

  checkStorage(): any {
    if (this.storage.getItem("token") != null) {
      return (this.userAuthenticated = true);
    } else {
      this.router.navigate(["auth/signup"]);
    }
  }

  getUser() {
    this.authservice.currentUser();
  }

  ngOnDestroy() {
    this.authListenerSubscription.unsubscribe();
  }
}
