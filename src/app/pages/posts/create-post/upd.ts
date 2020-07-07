// import { postsState, initialPosts, getPostsState } from "./../posts.reducer";
// import { createPostActions, createPostActionType } from "./create-post.action";
// import { SinglePost } from "./../model/post";
// import * as fromRoot from "../../../app.reducer";
// import { createFeatureSelector, createSelector } from "@ngrx/store";

// export interface createPostState {
//   post: SinglePost;
//   error: any;
// }

// export interface State extends fromRoot.State {
//   createpost: createPostState;
// }

// const initialPost: createPostState = {
//   post: null,
//   error: null,
// };

// export function createPostReducer(
//   state = initialPost,
//   action: createPostActions
// ) {
//   switch (action.type) {
//     case createPostActionType.createPost:
//       return {
//         ...state,
//         post: action.payload,
//       };
//     case createPostActionType.createPostFailure:
//       return {
//         ...state,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// }

// export const getPostState = createFeatureSelector("createpost");
// export const getAPost = createSelector(
//   getPostsState,
//   (state: createPostState): SinglePost => state.post
// );
