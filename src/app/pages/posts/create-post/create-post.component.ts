import { Component, OnInit } from "@angular/core";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"],
})
export class CreatePostComponent implements OnInit {
  faFeather = faFeather;

  constructor() {}

  ngOnInit() {}
}
