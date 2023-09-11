import { Router } from "express";
import {
  createRoleHandler,
  getRolesHandler,
  updateRoleHandler,
} from "../controllers/role.controller";
import { validate } from "../middlewares/validateResources";
import { createRoleSchema, updateRoleSchema } from "../schema/role.schema";

const roleRouter = Router();

roleRouter.post("/", validate(createRoleSchema),createRoleHandler);

roleRouter.get("/", getRolesHandler);

roleRouter.put("/:_id", validate(updateRoleSchema), updateRoleHandler);

export default roleRouter;
