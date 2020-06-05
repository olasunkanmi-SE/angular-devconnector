export interface Post {
  text: string;
  id: string;
  creator: string;
  avatar?: string;
  likes: [];
  comments: [];
  date: Date;
}

export interface singlePost {
  _id?: string;
  avatar?: string;
  comments?: [];
  date?: Date;
  likes?: [];
  name?: string;
  text: string;
  user?: string;
}

export interface comment {
  _id?: string;
  user?: string;
  text?: string;
  name?: string;
  avatar?: string;
  replies?: [];
  likes?: [];
  date?: Date;
}

export interface reply {
  _id?: string;
  user?: string;
  text?: string;
  name?: string;
  avatar?: string;
  date?: Date;
}
