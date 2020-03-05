import { UsersService } from "./../../shared/users.service";
import { User } from "./../../shared/user";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Subscription } from "rxjs";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  user: User;
  userQueryParams: any;
  querySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersservice: UsersService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.user = this.usersservice.getUser(+params["id"]);
    });
    // this.user = this.usersservice.getUser(1);
    // this.user = {
    //   id: this.route.snapshot.params["id"],
    //   name: this.route.snapshot.params["name"]
    // };

    //Create "dynamic" URL with Query Params
    // this.router.navigate(["/users"], {
    //   queryParams: { id: 1, name: "Raymond" }
    // });
    //  Subscribe to observable && retrieve Query Params from URL
    // this.querySubscription = this.route.queryParams.subscribe(data => {
    //   this.userQueryParams = data;
    // });

    //Retrieve User info from the URL
    // const id = this.route.snapshot.params["id"];
  }

  // Unsubscribe from Observable
  onDestroy() {
    this.querySubscription.unsubscribe();
  }
}
