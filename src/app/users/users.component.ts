import { User } from "./../shared/user";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users: User[] = [
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

  ngOnInit() {}
}
