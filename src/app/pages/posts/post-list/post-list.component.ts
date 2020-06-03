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

  @Input() post: any;
  id: string;
  commentForm;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.validateOnInit();
  }

  getExactPost() {
    this.postService.handlePost(this.post);
  }

  validateOnInit() {
    this.commentForm = this.formBuilder.group({
      text: [""],
    });
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
    this.getPost();
    setTimeout(() => {
      this.postService
        .createComment$(this.id, this.commentForm.value)
        .subscribe((res) => {
          console.log(res);
        });
    }, 1000);
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
