import { postsState, getPostsState } from "./../posts.reducer";
import { SinglePost } from "./../model/post";
import { PostActions, postActionTypes } from "./post-list.action";
import * as fromRoot from "../../../app.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../model/user";

export interface postState {
  currentUser: User;
  post: SinglePost;
  posts: postsState;
  error: any;
}

export interface State extends fromRoot.State {
  postlist: postState;
}

export function postReducer(state: postState, action: PostActions): postState {
  switch (action.type) {
    case postActionTypes.setPost:
      return {
        ...state,
        post: {
          ...state.posts.posts.find((post) => post._id === action.payload),
        },
      };
    case postActionTypes.commentOnAPost:
      return {
        ...state,
        post: action.payload,
      };
    case postActionTypes.likeAPost:
      return {
        ...state,
        post: action.payload,
      };
    case postActionTypes.deleteAPost:
      return {
        ...state,
      };
    case postActionTypes.deletePostError:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export const getPostState = createFeatureSelector("postlist");
export const getAPost = createSelector(
  getPostState,
  (state: postState): SinglePost => state.post
);

export const getComments = createSelector(
  getPostState,
  (state: postState) => state.post.comments
);

export const selectUser = (state: postState) => state.currentUser;
export const selectPost = (state: postState) => state.post;

export const deletePost = createSelector(
  selectUser,
  selectPost,
  (selectedUser: User, selectedPost: SinglePost) => {
    if (selectedUser.user._id === selectedPost.user) {
      createSelector(getPostState, (state: postState) => state.posts);
    } else {
      createSelector(getPostState, (state: postState): any => state.error);
    }
  }
);
