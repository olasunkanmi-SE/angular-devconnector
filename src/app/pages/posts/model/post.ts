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
  text: string;
}
