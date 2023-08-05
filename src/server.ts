import express from "express";
import routes from "./routes";

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  routes(app);

  return app;
}

export default createServer;
