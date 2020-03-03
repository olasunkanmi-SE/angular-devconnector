import { Subscription } from "rxjs";
import { ServerService } from "./../../shared/server.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Server } from "./../../shared/server";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"]
})
export class ServerComponent implements OnInit {
  private server: Server;
  x: number;
  userParams: any;
  paramsSubscription: Subscription;
  constructor(
    private serverService: ServerService,
    private route: ActivatedRoute
  ) {}

  createRandomServers() {
    this.x = Math.floor(Math.random() * 4);
    if (this.x === 0) this.x = 1;
    return this.x;
  }

  ngOnInit() {
    this.createRandomServers();
    this.server = this.serverService.getServer(this.x);
    this.paramsSubscription = this.route.queryParams.subscribe(params => {
      this.userParams = params;
      // if (this.userParams) console.log(this.userParams);
    });
  }
  OnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
