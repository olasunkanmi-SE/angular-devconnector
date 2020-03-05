import { User } from "./user";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: "Max"
    },
    {
      id: 2,
      name: "Raymond"
    },
    {
      id: 3,
      name: "Sunky"
    }
  ];

  constructor() {}

  getUsers() {
    return this.users;
  }

  getUser(id: number) {
    const user = this.users.find(user => {
      return user.id === id;
    });
    return user;
  }
}
