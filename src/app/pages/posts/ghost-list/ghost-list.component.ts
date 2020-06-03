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
  selector: "app-ghost-list",
  templateUrl: "./ghost-list.component.html",
  styleUrls: ["./ghost-list.component.css"],
})
export class GhostListComponent implements OnInit {
  ghosts = new Array(2);
  comments = new Array(2);
  replies;
  faCoffee = faCoffee;
  faUser = faUserCircle;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faComment = faComment;
  faFeather = faFeather;

  constructor() {}

  ngOnInit() {}
}
