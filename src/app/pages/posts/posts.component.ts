import { SinglePost } from "./model/post";
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
  isloading: boolean;
  postUpdatedSub: Subscription;
  posts: SinglePost[];
  totalPosts: number;
  postCreated: Date;
  error: boolean;
  newPostSub: Subscription;
  postSub: Subscription;
  newCommentSub: Subscription;
  id: any;
  comment;
  post: SinglePost;
  postsListSub: Subscription;

  constructor(
    private authservice: AuthService,
    private storage: StorageService,
    private title: Title,
    private postService: PostService
  ) {
    this.subscribeToNewPost();
  }

  subscribeToNewPost() {
    this.newPostSub = this.postService.getPost().subscribe((post) => {
      this.id = post.id;
      this.posts.unshift(post);
      return this.id;
    });
  }

  ngOnInit() {
    this.intitialize();
    this.getCurrentUser();
    this.getPostsList$();
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

  private getPostsList$() {
    this.isloading = true;
    this.postUpdatedSub = this.postService.getPosts$().subscribe(
      (res) => {
        this.posts = res.posts;
        this.postService.sendPosts(this.posts);
        this.totalPosts = +res.count;
        this.isloading = false;
      },
      (err) => {
        console.error(err);
        this.isloading = false;
        this.error = true;
      }
    );
  }

  ngOnDestroy() {
    this.authListenerSubscription.unsubscribe();
    this.userSubs.unsubscribe();
    this.postUpdatedSub.unsubscribe();
    this.newPostSub.unsubscribe();
  }
}
