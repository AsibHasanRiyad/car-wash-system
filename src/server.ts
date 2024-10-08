import { Server } from "http";

import mongoose from "mongoose";
import config from "./config";
import app from "./app";

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.dataBaseURL as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

process.on("unhandledRejection", () => {
  console.log(
    ` ⚠️ unhandledRejection is detected, server shutting down.........⚠️`
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});
process.on("uncaughtException", () => {
  console.log(
    ` ⚠️ uncaughtException is detected, server shutting down.........⚠️`
  );
  process.exit(1);
});
