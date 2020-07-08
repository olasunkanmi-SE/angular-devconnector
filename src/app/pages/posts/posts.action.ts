import { SinglePost } from "./model/post";
import { Action } from "@ngrx/store";
export enum postsActionTypes {
  setAvailablePosts = "[Posts] Set Available Posts",
  loadPostsFailure = "[Posts] Load Product Failure",
}

export class AvailablePosts implements Action {
  readonly type = postsActionTypes.setAvailablePosts;
  constructor(public payload: SinglePost[]) {}
}

export class LoadPostsError implements Action {
  readonly type = postsActionTypes.loadPostsFailure;
  constructor(public payload: any) {}
}

export type PostsActions = AvailablePosts | LoadPostsError;
