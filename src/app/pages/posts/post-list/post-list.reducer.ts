import { SinglePost } from "./../model/post";
import * as fromRoot from "../../../app.reducer";
export interface postState {
  post: SinglePost;
}

export interface State extends fromRoot.State {
  postlist: postState;
}
