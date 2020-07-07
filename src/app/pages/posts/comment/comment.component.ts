import { User } from "./../model/user";
import { AuthService } from "./../../../core/auth/services/auth/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { SinglePost, Comment, Reply } from "./../model/post";
import { Subscription } from "rxjs";
import { PostService } from "./../shared/post.service";
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
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
  @Input() comment: any;
  @Input() post: SinglePost;
  replies: Reply[];
  user: User;
  replySub: Subscription;
  likeSub: Subscription;
  userSub: Subscription;
  replyForm;
  constructor(
    private postService: PostService,
    private formbuilder: FormBuilder,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.getComment();
    this.validateOnInit();
    this.getComments();
    this.getCurrentUser();
  }

  validateOnInit() {
    this.replyForm = this.formbuilder.group({
      text: ["", [Validators.required]],
    });
  }

  getComment() {
    return this.comment;
  }

  replyComment() {
    this.replySub = this.postService
      .replyComment$(this.post._id, this.comment._id, this.replyForm.value)
      .subscribe((res) => {
        this.comment = res;
        this.replies = this.comment.replies;
      });
  }
  getCurrentUser() {
    this.userSub = this.authservice.currentUser$().subscribe((res) => {
      this.user = res;
    });
  }

  likeDislikeComment() {
    this.likeSub = this.postService
      .likeDisLikeComment$(this.post._id, this.comment._id, this.user)
      .subscribe((res) => {
        setTimeout(() => {
          this.comment.likes = res.likes;
        }, 1500);
      });
  }

  getComments() {
    return this.post.comments;
  }

  ngOnDestroy() {
    if (this.replySub) {
      this.replySub.unsubscribe();
    }
    if (this.likeSub) {
      this.likeSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
