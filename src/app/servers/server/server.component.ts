import { Subscription } from "rxjs";
import { ServerService } from "./../../shared/server.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Server } from "./../../shared/server";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"]
})
export class ServerComponent implements OnInit {
  server: Server;
  x: number;
  userParams: any;
  paramsSubscription: Subscription;
  constructor(
    private serverService: ServerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // createRandomServers() {
  //   this.x = Math.floor(Math.random() * 4);
  //   if (this.x === 0) this.x = 1;
  //   return this.x;
  // }

  ngOnInit() {
    // const id = +this.route.snapshot.params["id"];
    // this.server = this.serverService.getServer(id);
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.server = this.serverService.getServer(+params["id"]);
    });
    // this.createRandomServers();
    // this.server = this.serverService.getServer(this.x);
    // this.paramsSubscription = this.route.queryParams.subscribe(params => {
    //   this.userParams = params;
    //   // if (this.userParams) console.log(this.userParams);
    // });
  }
  onClick() {
    // this.router.navigateByUrl(`servers/${this.server.id}/edit`);
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve"
    });
  }

  OnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
