import { Express, Request, Response } from "express";
import itemRouter from "./routes/item.routes";
import itemCategoryRouter from "./routes/item-category.routes";
import authRouter from "./routes/auth.routes";
import { requiredUser } from "./middlewares/requiredUser";
import orderRouter from "./routes/order.routes";
import permissionRouter from "./routes/permission.routes";
import roleRouter from "./routes/role.routes";

function routes(app: Express) {
  app.get("/health-check", (req: Request, res: Response) => {
    return res.status(200);
  });

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/items", requiredUser, itemRouter);
  app.use("/api/v1/item-categories", requiredUser, itemCategoryRouter);
  app.use("/api/v1/orders", requiredUser, orderRouter);
  app.use("/api/v1/permissions", permissionRouter);
  app.use("/api/v1/roles", roleRouter);
}

export default routes;
