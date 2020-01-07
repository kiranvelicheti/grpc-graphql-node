/// <reference path="mali.d.ts" />

import mongoose from "mongoose";
import fs from "fs";
import * as grpc from "grpc";
import Mali from "mali";

import PostService from "./services/Post";
import BookService from "./services/Book";

import HealthService from "./services/Health";

class App {
  server: any;
  databaseUrl: string;
  port: number;

  public constructor(databaseUrl: string, port: number) {
    this.databaseUrl = databaseUrl;
    this.port = port;
  }

  public async start(this: App) {
    await mongoose.connect(this.databaseUrl, { useNewUrlParser: true });

    this.server = new Mali();
    this.server.on("error", (err: any, ctx: any) => {
      console.error(
        "server error for call %s of type %s",
        ctx.name,
        ctx.type,
        err
      );
    });
    this.server.addService(PostService.protoPath, "PostService");
    this.server.addService(BookService.protoPath, "BookService");
    this.server.addService(HealthService.protoPath);

    this.server.use(PostService.implementation);
    this.server.use(HealthService.implementation);
    this.server.use(BookService.implementation);

    this.server.start(`0.0.0.0:${this.port}`);
    console.info("server started");
  }

  public async stop() {
    this.server.stop();
  }
}

export default App;
