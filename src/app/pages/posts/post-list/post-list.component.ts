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
  faCoffee = faCoffee;
  faUser = faUserCircle;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faComment = faComment;
  faFeather = faFeather;

  constructor() {}

  ngOnInit() {}
}
