import { Router } from "express";
import {
  createRoleHandler,
  getRolesHandler,
  updateRoleHandler,
} from "../controllers/role.controller";
import { validate } from "../middlewares/validateResources";
import { createRoleSchema, updateRoleSchema } from "../schema/role.schema";
import { Func, funName, validateAuthority } from "../middlewares/validateAuthority";

const funcName = funName.role.key;

const roleRouter = Router();

roleRouter.post("/", validateAuthority(funcName, Func.Create), validate(createRoleSchema), createRoleHandler);

roleRouter.get("/", validateAuthority(funcName, Func.Read), getRolesHandler);

roleRouter.put("/:_id", validateAuthority(funcName, Func.Update), validate(updateRoleSchema), updateRoleHandler);

export default roleRouter;
