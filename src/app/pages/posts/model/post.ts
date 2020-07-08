export interface SinglePost {
  _id: string;
  avatar: string;
  comments: Comment[];
  date: Date;
  likes: [];
  firstname: string;
  text: string;
  user: string;
}

export interface Comment {
  _id?: string;
  id?: string;
  user?: string;
  text?: string;
  firstname?: string;
  avatar?: string;
  replies?: Reply[];
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
