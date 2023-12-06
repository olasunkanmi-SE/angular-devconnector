import { AvailablePosts } from "./posts.action";
import { map, take } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { SinglePost } from "./model/post";
import { PostService } from "./shared/post.service";
import { User } from "./model/user";
import { StorageService } from "./../../core/storage/storage.service";
import { AuthService } from "./../../core/auth/services/auth/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { faUserCircle, faFeather } from "@fortawesome/free-solid-svg-icons";
import { Subscription, Observable } from "rxjs";
import { Title } from "@angular/platform-browser";
import { startWith } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../app.reducer";
import * as fromCreatePost from "../../pages/posts/create-post/create-post.reducer";
import * as UI from "../../shared/store/action/ui.actions";
import * as AllPosts from "../posts/posts.action";
import * as fromPosts from "../posts/posts.reducer";

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
  newPost;
  isloading: boolean;
  postUpdatedSub: Subscription;
  posts$: Observable<SinglePost[]>;
  totalPosts: number;
  postCreated: Date;
  error: boolean;
  newPostSub: Subscription;
  postSub: Subscription;
  newCommentSub: Subscription;
  id: any;
  comment;
  post$: Observable<SinglePost>;
  getUsersSub: Subscription;
  developers: [] = [];
  devNames: string[] = [];
  myControl = new FormControl();
  options: string[] = this.devNames;
  filteredOptions: Observable<string[]>;
  userName;
  randomDev;
  isLoading$: Observable<boolean>;

  constructor(
    private authservice: AuthService,
    private storage: StorageService,
    private title: Title,
    private postService: PostService,
    private authService: AuthService,
    private store: Store<fromCreatePost.State>
  ) {
    this.getCurrentUser();
    this.subscribeToNewPost();

    this;
    this.getDevelopersByName();
    this.devNames;
  }

  subscribeToNewPost() {
    this.posts$ = this.store.select(fromPosts.getAvailablePosts);
    // this.store.select(fromCreatePost.getAPost)
    // .pipe(take(1)).subscribe((res)=> this.posts$)
  }

  //   this.newPostSub = this.postService.getPost().subscribe((post) => {
  //     this.id = post.id;
  //     if (!this.posts$) {
  //       this.getPostsList$();
  //     } else {
  //       this.posts$.unshift(this.post$);
  //       return this.getPostsList$();
  //     }
  //   });
  // }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.intitialize();
    this.getPostsList$();
    this.posts$ = this.store.select(fromPosts.getAvailablePosts);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
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

  private _filter(value: string): string[] {
    const filterValue = value.toLocaleLowerCase();
    return this.options.filter(
      (option) => option.toLocaleLowerCase().indexOf(filterValue) === 0
    );
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
      this.userName = this.user["firstname"];
    });
  }

  getDevelopersByName() {
    this.getUsersSub = this.authService.getUsers$().subscribe((res) => {
      this.developers = res.users;
      this.developers.filter((developer) => {
        const name = developer["firstname"];
        this.devNames.push(name);
        return this.devNames;
      });
    });
  }

  private getPostsList$() {
    this.postService.getPosts$().subscribe(
      (res) => {
        this.totalPosts = +res.count;
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new AllPosts.AvailablePosts(res.posts));
      },
      (err) => {
        console.error(err);
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new AllPosts.LoadPostsError(err));
        this.error = true;
      }
    );
  }

  ngOnDestroy() {
    this.authListenerSubscription.unsubscribe();
    this.userSubs.unsubscribe();
    this.newPostSub.unsubscribe();
    this.getUsersSub.unsubscribe();
  }
}
