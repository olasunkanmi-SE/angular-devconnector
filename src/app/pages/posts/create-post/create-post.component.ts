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

  constructor(private formbuilder: FormBuilder) {}

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
}
