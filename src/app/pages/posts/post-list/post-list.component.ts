import { User } from "./../model/user";
import { AuthService } from "./../../../core/auth/services/auth/auth.service";
import { singlePost } from "./../model/post";
import { FormBuilder } from "@angular/forms";
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
import { Subscription, Observable } from "rxjs";

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
  posts: singlePost[];
  comments: Comment[];
  id: string;
  commentForm;
  userSub: Subscription;
  user: User;
  commentSub: Subscription;
  likeSub: Subscription;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.validateOnInit();
  }

  validateOnInit() {
    this.commentForm = this.formBuilder.group({
      text: [""],
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
      .subscribe((res: singlePost) => {
        this.post.comments = res.comments;
        this.comments = this.post.comments;
      });
  }

  likeDisLikeComment() {
    this.currentUser();
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
  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    this.userSub.unsubscribe();
    this.commentSub.unsubscribe();
    this.likeSub.unsubscribe();
  }
}
