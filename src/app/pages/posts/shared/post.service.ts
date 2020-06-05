import { User } from "./../model/user";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { Post, singlePost, comment } from "./../model/post";
import { environment } from "./../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy, Output, EventEmitter } from "@angular/core";
import { takeUntil, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PostService implements OnDestroy {
  posts: Post[] = [];
  backendURL = environment.backendAPI;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private postSubject = new Subject<any>();
  private postsSubject = new Subject<any>();
  constructor(private http: HttpClient) {}
  @Output() post = new EventEmitter<singlePost>();
  @Output() comment = new EventEmitter<Comment>();
  sendPost(post: singlePost) {
    this.postSubject.next(post);
  }

  getPost(): Observable<any> {
    return this.postSubject.asObservable();
  }

  sendPosts(posts: singlePost[]) {
    this.postsSubject.next(posts);
  }

  getPosts() {
    return this.postsSubject.asObservable();
  }

  handlePost(post) {
    this.post.emit(post);
  }

  handleComment(comment) {
    this.comment.emit(comment);
  }

  getPosts$(): Observable<{ count: string; posts: any }> {
    return this.http
      .get<{ count: string; posts: any }>(`${this.backendURL}/posts`)
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                text: post.text,
                id: post._id,
                user: post.user,
                creator: post.name,
                avatar: post.avatar,
                likes: post.likes,
                comments: post.comments,
                date: post.date,
              };
            }),
            count: postData.count,
          };
        }),
        takeUntil(this.destroy$.asObservable())
      );
  }

  createPost$(post) {
    return this.http
      .post<{ singlePost }>(`${this.backendURL}/posts`, post)
      .pipe(takeUntil(this.destroy$));
  }

  getPostById$(id: any) {
    return this.http.get<singlePost>(`${this.backendURL}/posts/${id}`).pipe(
      map((post) => {
        return {
          text: post.text,
          id: post._id,
          user: post.user,
          creator: post.name,
          avatar: post.avatar,
          likes: post.likes,
          comments: post.comments,
          date: post.date,
        };
      }),
      takeUntil(this.destroy$)
    );
  }

  createComment$(id: string, comment: Comment) {
    return this.http
      .post<singlePost>(`${this.backendURL}/posts/comment/${id}`, comment)
      .pipe(takeUntil(this.destroy$));
  }

  likeDislikePost$(id: string, user: User) {
    return this.http
      .post<singlePost>(`${this.backendURL}/posts/like/${id}`, user)
      .pipe(takeUntil(this.destroy$));
  }

  replyComment$() {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.postSubject.next();
    this.destroy$.unsubscribe();
    this.postSubject.unsubscribe();
  }
}
