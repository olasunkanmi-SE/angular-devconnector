import { User } from "./../../shared/user";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, observable } from "rxjs";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  user: User;
  userParams: any;
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // this.user = {
    //   id: this.route.snapshot.params["id"],
    //   name: this.route.snapshot.params["name"]
    // };

    //Create "dynamic" URL

    this.router.navigate(["/users"], {
      queryParams: { id: 1, name: "Raymond" }
    });
    //  Subscribe to observable
    this.paramsSubscription = this.route.queryParams.subscribe(params => {
      this.userParams = params;
      console.log(this.userParams);
      this.user = this.userParams;
    });
  }

  // Unsubscribe from Observable
  onDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
