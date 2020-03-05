import { UsersService } from "./../shared/users.service";
import { User } from "./../shared/user";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users: User[];
  constructor(private usersservice: UsersService) {}

  ngOnInit() {
    this.users = this.usersservice.getUsers();
  }
}
