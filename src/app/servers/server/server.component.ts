import { ServerService } from "./../../shared/server.service";
import { Component, OnInit } from "@angular/core";
import { Server } from "./../../shared/server";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"]
})
export class ServerComponent implements OnInit {
  private server: Server;
  x: number;
  constructor(private serverService: ServerService) {}

  createRandomServers() {
    this.x = Math.floor(Math.random() * 4);
    if (this.x === 0) this.x = 1;
    return this.x;
  }

  ngOnInit() {
    this.createRandomServers();
    this.server = this.serverService.getServer(this.x);
  }
}
