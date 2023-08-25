import express from "express";
import routes from "./routes";
import cors from "cors";
import { deserializeUser } from "./middlewares/deserializeUser";

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.static("./public"));
  app.use("/api/v1/", express.static("./public/uploads"));
  app.use(deserializeUser);

  routes(app);

  return app;
}

export default createServer;
