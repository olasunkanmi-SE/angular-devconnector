import { FormGroup, FormControl } from "@angular/forms";
import { Post } from "./shared/post";
import { DataService } from "./shared/data.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  posts: Post[];
  @Output() allPosts = new EventEmitter();
  @Input() post: any;
  myForm: FormGroup;
  constructor(private dataservice: DataService) {}

  ngOnInit() {
    this.dataservice.getPosts().subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    });
    this.myForm = new FormGroup({
      search: new FormControl("")
    });
  }

  onSelectOption() {
    this.dataservice.handleSelect(this.post);
  }
}
