import { Observable } from "rxjs";
import { ServerService } from "./../../shared/server.service";
import { Server } from "./../../shared/server";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CanComponentDeactivate } from "src/app/shared/can-component-deactivate";
import { promise } from "protractor";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"]
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: Server;
  x: number;
  serverName = "";
  serverStatus = "";
  allowed;
  changesSaved = false;

  constructor(
    private serverservice: ServerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  // createRandomServers() {
  //   this.x = Math.floor(Math.random() * 4);
  //   if (this.x === 0) this.x = 1;
  //   return this.x;
  // }

  ngOnInit() {
    // this.createRandomServers();
    this.route.params.subscribe((params: Params) => {
      this.x = +params["id"];
    });

    this.route.queryParams.subscribe(queryparams => {
      this.allowed = queryparams["allowed"];
    });
    this.server = this.serverservice.getServer(this.x);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serverservice.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus
    });
    console.log(this.server.status, this.server.name);
    this.changesSaved = true;
    this.router.navigate(["../"], { relativeTo: this.route }); //navigate to the last loaded route, relative to this route.
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.allowed == 1) {
      if (
        (this.serverName !== this.server.name ||
          this.serverStatus !== this.server.status) &&
        !this.changesSaved
      ) {
        return confirm("Do you want to discard changes");
      } else {
        return true;
      }
    }
  }
}
