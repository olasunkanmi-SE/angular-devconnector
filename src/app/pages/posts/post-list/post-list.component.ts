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
  id: string;
  commentForm;
  comment: Comment[];

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder
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
    this.postService
      .createComment$(this.post.id, this.commentForm.value)
      .subscribe((res: singlePost) => {
        this.post.comments = res.comments;
      });
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
