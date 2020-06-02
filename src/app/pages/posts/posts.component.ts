import { PostService } from "./shared/post.service";
import { User } from "./model/user";
import { StorageService } from "./../../core/storage/storage.service";
import { AuthService } from "./../../core/auth/services/auth/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { faUserCircle, faFeather } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  user: User;
  faUser = faUserCircle;
  faFeather = faFeather;
  authListenerSubscription: Subscription;
  userAuthenticated: boolean = false;
  pageTitle: string = "Developers Feed";
  currentUser;
  newPost;

  post;

  constructor(
    private authservice: AuthService,
    private storage: StorageService,
    private title: Title
  ) {}

  ngOnInit() {
    this.intitialize();
    this.getCurrentUser();
  }

  intitialize() {
    this.title.setTitle(this.pageTitle);
    new Promise((resolve, reject) => {
      resolve(
        (this.authListenerSubscription = this.authservice
          .getAuthStatusListener()
          .subscribe((isAuthenticated) => {
            this.userAuthenticated = isAuthenticated;
          }))
      );
    }).then(this.checkStorage());
  }

  checkStorage(): any {
    if (+this.storage.getItem("expiration") > Date.now()) {
      return (this.userAuthenticated = true);
    }
  }

  getUser() {
    this.authservice.autoAuthenticateUser();
  }

  onClick() {
    console.log(+this.storage.getItem("expiration") > Date.now());
  }

  getCurrentUser() {
    this.userSubs = this.authservice.currentUser$().subscribe((res) => {
      this.user = res;
      this.currentUser = res.user;
    });
  }

  ngOnDestroy() {
    this.authListenerSubscription.unsubscribe();
    this.userSubs.unsubscribe();
  }
}
