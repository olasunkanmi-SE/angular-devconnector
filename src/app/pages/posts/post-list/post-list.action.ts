import { SinglePost } from "./../model/post";
import { Action } from "@ngrx/store";
export enum postActionTypes {
  setPost = "[post] Set A Post",
  likeAPost = "[post] Like A Post",
  commentOnAPost = "[post] comment A Post",
  deleteAPost = "[post] delete A Post",
}

export class specificPost implements Action {
  readonly type = postActionTypes.setPost;
  constructor(public payload: SinglePost) {}
}

export class likePost implements Action {
  readonly type = postActionTypes.likeAPost;
  constructor(public payload: SinglePost) {}
}

export class CommentOnPost implements Action {
  readonly type = postActionTypes.commentOnAPost;
  constructor(public payload: SinglePost) {}
}

export class DeletePost implements Action {
  readonly type = postActionTypes.deleteAPost;
  constructor(public payload: SinglePost) {}
}
