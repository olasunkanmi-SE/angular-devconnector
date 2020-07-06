import { Store } from "@ngrx/store";
import { SinglePost } from "./../model/post";
import { Subscription, Observable } from "rxjs";
import { PostService } from "./../shared/post.service";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import * as fromPost from "../create-post/create-post.reducer";
import * as postAction from "../create-post/create-post.action";
import * as AllPosts from "../../posts/posts.action";
import * as fromPosts from "../../posts/posts.reducer";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"],
})
export class CreatePostComponent implements OnInit {
  faFeather = faFeather;
  postForm;
  post$: Observable<SinglePost>;
  posts$;

  constructor(
    private formbuilder: FormBuilder,
    private postService: PostService,
    private store: Store<fromPost.State>
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.post$ = this.store.select(fromPost.getAPost);
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
    this.postService.createPost$(this.postForm.value).subscribe(
      (res: any) => {
        this.store.dispatch(new postAction.CreatePost(res[0]));
        this.store.dispatch(new AllPosts.AvailablePosts(res));
      },
      (err) => {
        console.log(err);
        this.store.dispatch(new postAction.PostError(err));
      }
    );
  }
}
