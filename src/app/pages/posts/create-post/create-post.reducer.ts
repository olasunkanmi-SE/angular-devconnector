import { createPostActions, createPostActionType } from "./create-post.action";
import { SinglePost } from "./../model/post";
import * as fromRoot from "../../../app.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface createPostState {
  post: SinglePost;
  error: any;
}

export interface State extends fromRoot.State {
  createpost: createPostState;
}

const initialPost: createPostState = {
  post: null,
  error: null,
};

export function createPostReducer(
  state = initialPost,
  action: createPostActions
) {
  switch (action.type) {
    case createPostActionType.createPost:
      return {
        ...state,
        post: {
          post: action.payload,
        },
      };
    case createPostActionType.createPostFailure:
      return {
        ...state,
        error: action.payload,
      };

    default:
      break;
  }
}

export const getPostState = createFeatureSelector("createpost");
export const getAPost = createSelector(
  getPostState,
  (state: createPostState): SinglePost => state.post
);
