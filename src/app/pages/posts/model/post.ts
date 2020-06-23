export interface Post {
  text: string;
  id: string;
  creator: string;
  avatar?: string;
  likes: [];
  comments: [];
  date: Date;
}

export interface SinglePost {
  _id?: string;
  id?: string;
  avatar?: string;
  comments?: [];
  date?: Date;
  likes?: [];
  firstname?: string;
  text: string;
  user?: string;
}

export interface Comment {
  _id?: string;
  id?: string;
  user?: string;
  text?: string;
  firstname?: string;
  avatar?: string;
  replies?: [];
  likes?: [];
  date?: Date;
}

export interface Reply {
  _id?: string;
  user?: string;
  text?: string;
  firstname?: string;
  avatar?: string;
  date?: Date;
}
