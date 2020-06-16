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
  replySub: Subscription;
  replyForm;
  constructor(
    private postService: PostService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getComment();
    this.validateOnInit();
    this.getComments();
  }

  validateOnInit() {
    this.replyForm = this.formbuilder.group({
      text: ["", [Validators.required]],
    });
  }

  getComment() {
    this.postService.handleComment(this.comment);
  }

  replyComment() {
    this.replySub = this.postService
      .replyComment$(this.post.id, this.comment._id, this.replyForm.value)
      .subscribe((res) => {
        this.comment = res;
        this.replies = this.comment.replies;
      });
  }

  getComments() {
    return this.post.comments;
  }

  ngOnDestroy() {
    if (this.replySub) {
      this.replySub.unsubscribe();
    }
  }
}
