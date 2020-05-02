import { Component, OnInit } from "@angular/core";
import { faUserCircle, faFeather } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
  faUser = faUserCircle;
  faFeather = faFeather;

  constructor() {}

  ngOnInit() {}
}
