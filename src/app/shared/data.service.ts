import { Post } from "./post";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  public posts: Post[];

  @Output() post = new EventEmitter<Post>();

  searchOption = [];

  postUrl: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }

  handleSelect(post: Post) {
    this.post.emit(post);
  }
}
