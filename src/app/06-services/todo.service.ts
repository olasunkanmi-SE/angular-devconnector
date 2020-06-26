import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

export class TodoService {
  constructor(private http: HttpClient) {}

  add(todo) {
    return this.http.post("...", todo).pipe(map((r: any) => r));
  }

  getTodos() {
    return this.http.get("...").pipe(map((r: any) => r));
  }

  delete(id) {
    return this.http.delete("...").pipe(map((r: any) => r));
  }
}
