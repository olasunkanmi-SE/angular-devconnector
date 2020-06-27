import { SinglePost } from "./../model/post";
import { Subscription } from "rxjs";
import { PostService } from "./../shared/post.service";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"],
})
export class CreatePostComponent implements OnInit {
  faFeather = faFeather;
  postForm;
  post;
  postSubs: Subscription;

  constructor(
    private formbuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.postForm = this.formbuilder.group({
      text: ["", [Validators.required]],
    });
  }

  get text() {
    return this.postForm.get("text");
  }

  createPost() {
    this.postSubs = this.postService.createPost$(this.postForm.value).subscribe(
      (res) => {
        this.post = res;
        this.postService.sendPost(this.post);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  OnDestroy() {
    this.postSubs.unsubscribe();
  }
}
