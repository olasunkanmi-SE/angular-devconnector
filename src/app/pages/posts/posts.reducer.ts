import { postsActionTypes, PostsActions } from "./posts.action";
import { Action, createFeatureSelector, createSelector } from "@ngrx/store";
import { SinglePost } from "./model/post";
import * as fromRoot from "../../../app/app.reducer";

export interface postsState {
  posts: SinglePost[];
  error?: any;
}
export interface State extends fromRoot.State {
  posts: postsState;
}

export const initialPosts: postsState = {
  posts: [],
  error: null,
};

export function postsReducer(state, action: PostsActions): postsState {
  switch (action.type) {
    case postsActionTypes.setAvailablePosts:
      return {
        ...state,
        posts: action.payload,
      };
    case postsActionTypes.loadPostsFailure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getPostsState = createFeatureSelector("posts");
export const getAvailablePosts = createSelector(
  getPostsState,
  (state: postsState): SinglePost[] => state.posts
);
