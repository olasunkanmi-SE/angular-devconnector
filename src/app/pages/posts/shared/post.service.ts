import { User } from "./../model/user";
import { Subject, Observable } from "rxjs";
import { SinglePost, Comment, Reply } from "./../model/post";
import { environment } from "./../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy, Output, EventEmitter } from "@angular/core";
import { takeUntil, map, take, concatMap } from "rxjs/operators";
import * as fromRoot from "../../../app.reducer";
import * as UI from "../../../shared/store/action/ui.actions";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class PostService implements OnDestroy {
  posts: SinglePost[] = [];
  backendURL = environment.backendAPI;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private postSubject = new Subject<any>();
  private postsSubject = new Subject<SinglePost[]>();
  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {}
  @Output() post = new EventEmitter<SinglePost>();
  @Output() comment = new EventEmitter<Comment>();
  @Output() reply = new EventEmitter<Reply>();

  sendPost(post: SinglePost) {
    this.postSubject.next(post);
  }

  getPost(): Observable<any> {
    return this.postSubject.asObservable();
  }

  sendPosts(posts: SinglePost[]) {
    this.postsSubject.next(posts);
  }

  getnewPosts$() {
    return this.postsSubject.asObservable();
  }

  handlePost(post) {
    this.post.emit(post);
  }

  handleComment(comment) {
    this.comment.emit(comment);
  }

  handleReply(reply) {
    this.reply.emit(reply);
  }

  getPosts$(): Observable<{ count: string; posts: SinglePost[] }> {
    this.store.dispatch(new UI.StartLoading());
    return this.http
      .get<{ count: string; posts: SinglePost[] }>(`${this.backendURL}/posts`)
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post: SinglePost) => {
              return {
                text: post.text,
                _id: post._id,
                firstname: post.firstname,
                avatar: post.avatar,
                likes: post.likes,
                comments: post.comments,
                date: post.date,
                user: post.user,
              };
            }),
            count: postData.count,
          };
        }),
        takeUntil(this.destroy$.asObservable())
      );
  }

  filterPostExample() {
    const filteredPost = this.getPosts$().pipe(
      map((postData) => {
        let posts: SinglePost[] = postData.posts;
        posts.filter((post: SinglePost) => post.comments.length > 2);
      })
    );
    return filteredPost;
  }

  createPost$(post): Observable<SinglePost[]> {
    return this.http
      .post<SinglePost[]>(`${this.backendURL}/posts`, post)
      .pipe(takeUntil(this.destroy$));
  }

  getPostById$(id: any): Observable<SinglePost> {
    return this.http.get<SinglePost>(`${this.backendURL}/posts/${id}`).pipe(
      map((post) => {
        return {
          text: post.text,
          _id: post._id,
          user: post.user,
          firstname: post.firstname,
          avatar: post.avatar,
          likes: post.likes,
          comments: post.comments,
          date: post.date,
        };
      }),
      takeUntil(this.destroy$)
    );
  }

  createComment$(id: string, comment: Comment): Observable<SinglePost> {
    return this.http
      .post<SinglePost>(`${this.backendURL}/posts/comment/${id}`, comment)
      .pipe(takeUntil(this.destroy$));
  }

  likeDislikePost$(id: string, user: User): Observable<SinglePost> {
    return this.http
      .post<SinglePost>(`${this.backendURL}/posts/like/${id}`, user)
      .pipe(takeUntil(this.destroy$));
  }

  replyComment$(
    id: string,
    commentId: string,
    reply: Reply
  ): Observable<Comment> {
    return this.http
      .post<Comment>(
        `${this.backendURL}/posts/comment/reply/${id}/${commentId}`,
        reply
      )
      .pipe(takeUntil(this.destroy$));
  }

  likeDisLikeComment$(
    id: string,
    commentId: string,
    user: User
  ): Observable<Comment> {
    return this.http
      .post<Comment>(
        `${this.backendURL}/posts/comment/like/${id}/${commentId}`,
        user
      )
      .pipe(takeUntil(this.destroy$));
  }

  deletePost$(id: string): Observable<SinglePost[]> {
    return this.http
      .delete<SinglePost[]>(`${this.backendURL}/posts/${id}`)
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.postSubject.next();
    this.destroy$.unsubscribe();
    this.postSubject.unsubscribe();
  }
}
