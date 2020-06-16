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
  selector: "app-reply",
  templateUrl: "./reply.component.html",
  styleUrls: ["./reply.component.css"],
})
export class ReplyComponent implements OnInit {
  faCoffee = faCoffee;
  faUser = faUserCircle;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faComment = faComment;
  faFeather = faFeather;
  @Input() comment: any;
  @Input() reply: any;
  constructor(private postService: PostService) {
    this.postService.sendReply(this.reply);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
