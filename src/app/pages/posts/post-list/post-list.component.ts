import { Router } from "@angular/router";
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
  posts$: Post[];
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
  newPostSub: Subscription;
  postSub: Subscription;
  newPost;
  private post;
  id: number;

  constructor(private postService: PostService, private router: Router) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.newPostSub = this.postService.getPost().subscribe((post) => {
      this.id = post._id;
      console.log(this.id);
      this.posts$.unshift(post);
    });
  }

  ngOnInit() {
    this.getPostsList();
  }

  private getPostsList() {
    this.isloading = true;
    this.postUpdatedSub = this.postService.getPosts$().subscribe(
      (res) => {
        this.posts$ = res.posts;
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

  getPostById(id) {
    this.post = this.posts$.find((post) => {
      if (post.id == id) {
        this.postSub = this.postService.getPostById$(id).subscribe((res) => {
          this.post = res;
          console.log(this.post);
        });
      }
      return;
    });
  }

  checkPost() {
    this.getPostById(this.id);
  }

  ngOnDestroy() {
    this.postUpdatedSub.unsubscribe();
  }
}
