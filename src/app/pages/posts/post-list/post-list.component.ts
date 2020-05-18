import { Post } from "./../model/post";
import { PostService } from "./../shared/post.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  faCoffee,
  faUserCircle,
  faThumbsUp,
  faThumbsDown,
  faComment,
  faFeather,
} from "@fortawesome/free-solid-svg-icons";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts$: Observable<Post[]>;
  totalPosts: number;
  postCreated: Date;
  isloading: boolean;
  error: boolean;
  postUpdatedSub: Subscription;
  faCoffee = faCoffee;
  faUser = faUserCircle;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faComment = faComment;
  faFeather = faFeather;

  constructor(private postservice: PostService) {}

  ngOnInit() {
    this.getPostsList();
  }

  private getPostsList() {
    this.isloading = true;
    this.postUpdatedSub = this.postservice.getPosts$().subscribe(
      (res) => {
        this.posts$ = res.posts;
        console.log(this.posts$);
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
    this.postUpdatedSub.unsubscribe();
  }
}
