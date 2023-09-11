import { Router } from "express";
import {
  createPermissionHandler,
  getPermissionHandler,
  updatePermissionHandler,
} from "../controllers/permission.controller";
import { validate } from "../middlewares/validateResources";
import { createPermissionSchema, updatePermissionSchema } from "../schema/permission.schema";

const permissionRouter = Router();

permissionRouter.post(
  "/",
  validate(createPermissionSchema),
  createPermissionHandler
);

permissionRouter.get("/", getPermissionHandler);

permissionRouter.put("/:_id", validate(updatePermissionSchema), updatePermissionHandler);

export default permissionRouter;
