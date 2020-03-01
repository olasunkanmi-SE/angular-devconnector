import { Server } from "./server";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ServerService {
  private servers: Server[] = [
    {
      id: 1,
      name: "ProductionServer",
      status: "online"
    },
    {
      id: 2,
      name: "Testserver",
      status: "offline"
    },
    {
      id: 3,
      name: "Devserver",
      status: "offline"
    }
  ];

  constructor() {}

  getServers() {
    return this.servers;
  }

  getServer(id: number) {
    this.servers.find(server => {
      return server.id === id;
    });
  }

  updateServer(id: number, updatedServer: Server) {
    const server = this.servers.find(s => {
      return s.id === id;
    });
    if (server) {
      server.name = updatedServer.name;
      server.status = updatedServer.status;
    }
  }
}
