import { ServerService } from "./../shared/server.service";
import { Server } from "./../shared/server";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.css"]
})
export class ServersComponent implements OnInit {
  private servers: Server[];
  constructor(private serverservice: ServerService) {}

  ngOnInit() {
    this.servers = this.serverservice.getServers();
  }
}
