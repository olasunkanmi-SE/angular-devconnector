import { ServerService } from "./../../shared/server.service";
import { Server } from "./../../shared/server";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"]
})
export class EditServerComponent implements OnInit {
  server: Server;
  x: number;
  serverName = "";
  serverStatus = "";
  allowed;

  constructor(
    private serverservice: ServerService,
    private route: ActivatedRoute
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
  }
}
