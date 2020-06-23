import { User } from "./../model/user";
import { AuthService } from "./../../../core/auth/services/auth/auth.service";
import { SinglePost, Comment } from "./../model/post";
import { FormBuilder, Validators } from "@angular/forms";
import { PostService } from "./../shared/post.service";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import {
  faCoffee,
  faUserCircle,
  faThumbsUp,
  faThumbsDown,
  faComment,
  faFeather,
} from "@fortawesome/free-solid-svg-icons";
import { Subscription, Observable, Subject } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  faCoffee = faCoffee;
  faUser = faUserCircle;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faComment = faComment;
  faFeather = faFeather;
  postSub: Subscription;
  postsListSub: Subscription;
  @Input() post: any;
  posts: SinglePost[];
  comments: Comment[];
  id: string;
  commentForm;
  userSub: Subscription;
  user: User;
  commentSub: Subscription;
  likeSub: Subscription;
  replySub;
  deleteSub;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.posts;
  }

  ngOnInit() {
    this.validateOnInit();
    this.comments = this.getComments();
  }

  validateOnInit() {
    this.commentForm = this.formBuilder.group({
      text: ["", [Validators.required]],
    });
  }

  getExactPost() {
    this.postService.handlePost(this.post);
  }

  getPost() {
    this.getExactPost();
    this.postSub = this.postService
      .getPostById$(this.post.id)
      .subscribe((res) => {
        this.id = res.id;
      });
  }

  createComment() {
    this.commentSub = this.postService
      .createComment$(this.post.id, this.commentForm.value)
      .subscribe((res: SinglePost) => {
        this.post.comments = res.comments;
        this.comments = this.post.comments;
      });
  }

  getComments() {
    return this.post.comments;
  }

  likeDisLikeComment() {
    this.likeSub = this.postService
      .likeDislikePost$(this.post.id, this.user)
      .subscribe((res) => {
        this.post.likes = res.likes;
      });
  }
  currentUser() {
    this.userSub = this.authService.currentUser$().subscribe((res) => {
      this.user = res;
    });
  }

  deletePost() {
    this.deleteSub = this.postService
      .deletePost$(this.post.id)
      .subscribe((res) => {
        this.posts = res;
        this.postService.sendPosts(res);
      });
  }

  updatePost() {}

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.commentSub) {
      this.commentSub.unsubscribe();
    }
    if (this.likeSub) {
      this.likeSub.unsubscribe();
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
