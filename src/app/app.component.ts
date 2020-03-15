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
  @Input() post: any;
  myForm: FormGroup;
  autoCompleteList: any[];

  constructor(private dataservice: DataService) {}

  ngOnInit() {
    this.dataservice.getPosts().subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    });
    this.myForm = new FormGroup({
      search: new FormControl("")
    });

    this.getUserInput();
  }

  getUserInput() {
    this.myForm.valueChanges.subscribe(userInput => {
      let x = this.autoCompletePostList(userInput);
      console.log(typeof x);
    });
  }

  private autoCompletePostList(input) {
    let filteredPost = this.filterPosts(input);
    this.autoCompleteList = filteredPost;
  }

  filterPosts(searchParams) {
    if (typeof searchParams != "string") {
      return [];
    }
    if (searchParams === null || "") {
      return [];
    }
    return searchParams
      ? this.posts.filter(p =>
          p.title.toLocaleLowerCase().indexOf(searchParams.toLocaleLowerCase())
        )
      : this.posts;
  }

  onSelectOption() {
    this.dataservice.handleSelect(this.post);
  }
}
