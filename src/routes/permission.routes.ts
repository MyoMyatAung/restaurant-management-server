import { Router } from "express";
import {
  createPermissionHandler,
  getPermissionHandler,
  updatePermissionHandler,
} from "../controllers/permission.controller";
import { validate } from "../middlewares/validateResources";
import { createPermissionSchema, updatePermissionSchema } from "../schema/permission.schema";
import { Func, funName, validateAuthority } from "../middlewares/validateAuthority";

const funcName = funName.permission.key;

const permissionRouter = Router();

permissionRouter.post("/", validateAuthority(funcName, Func.Create), validate(createPermissionSchema), createPermissionHandler);

permissionRouter.get("/", validateAuthority(funcName, Func.Read), getPermissionHandler);

permissionRouter.put("/:_id", validateAuthority(funcName, Func.Update), validate(updatePermissionSchema), updatePermissionHandler);

export default permissionRouter;
