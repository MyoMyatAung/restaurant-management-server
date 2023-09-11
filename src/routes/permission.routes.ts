import { Router } from "express";
import {
  createPermissionHandler,
  getPermissionHandler,
} from "../controllers/permission.controller";
import { validate } from "../middlewares/validateResources";
import { createPermissionSchema } from "../schema/permission.schema";

const permissionRouter = Router();

permissionRouter.post(
  "/",
  validate(createPermissionSchema),
  createPermissionHandler
);

permissionRouter.get("/", getPermissionHandler);

export default permissionRouter;
