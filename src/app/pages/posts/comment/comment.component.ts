import { SinglePost, Comment } from "./../model/post";
import { Subscription } from "rxjs";
import { PostService } from "./../shared/post.service";
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import {
  faCoffee,
  faUserCircle,
  faThumbsUp,
  faThumbsDown,
  faComment,
  faFeather,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"],
})
export class CommentComponent implements OnInit {
  faCoffee = faCoffee;
  faUser = faUserCircle;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faComment = faComment;
  faFeather = faFeather;
  @Input() comment: Comment;
  @Input() post: SinglePost;
  replySub: Subscription;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getComment();
  }

  getComment() {
    this.postService.handleComment(this.comment);
  }

  replyComment() {
    console.log(this.post._id);
  }

  ngOnDestroy() {
    if (this.replySub) {
      this.replySub.unsubscribe();
    }
  }
}
