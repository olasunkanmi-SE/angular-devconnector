import { Subject, Observable, BehaviorSubject } from "rxjs";
import { Post, singlePost } from "./../model/post";
import { environment } from "./../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { takeUntil, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PostService implements OnDestroy {
  posts: Post[] = [];
  backendURL = environment.backendAPI;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private postSubject = new Subject<any>();
  constructor(private http: HttpClient) {}
  private post;

  sendPost(post: singlePost) {
    this.postSubject.next(post);
  }

  getPost(): Observable<any> {
    return this.postSubject.asObservable();
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
      .post<{ post }>(`${this.backendURL}/posts`, post)
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.postSubject.next();
    this.destroy$.unsubscribe();
    this.postSubject.unsubscribe();
  }
}
