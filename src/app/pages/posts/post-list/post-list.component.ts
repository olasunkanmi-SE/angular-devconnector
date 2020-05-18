import { Post } from "./../model/post";
import { PostService } from "./../shared/post.service";
import { Component, OnInit } from "@angular/core";
import {
  faCoffee,
  faUserCircle,
  faThumbsUp,
  faThumbsDown,
  faComment,
  faFeather,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  totalPosts: number;
  faCoffee = faCoffee;
  faUser = faUserCircle;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faComment = faComment;
  faFeather = faFeather;

  constructor(private postservice: PostService) {
    this.postservice
      .getPostsUpdateListener()
      .subscribe((postData: { posts: Post[]; postsCount: number }) => {
        this.posts = postData.posts;
        this.totalPosts = postData.postsCount;
      });
    setTimeout(() => {
      console.log(this.totalPosts);
    }, 2000);
  }

  ngOnInit() {}
}
