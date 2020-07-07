import { SinglePost } from "./../model/post";
import { Action } from "@ngrx/store";
export enum createPostActionType {
  createPost = "[CreatePost] Create New Post",
  createPostFailure = "[createPost] create Post Error",
}

export class CreatePost implements Action {
  readonly type = createPostActionType.createPost;
  constructor(public payload: SinglePost) {}
}

export class PostError implements Action {
  readonly type = createPostActionType.createPostFailure;
  constructor(public payload: any) {}
}

export type createPostActions = CreatePost | PostError;
