import { Router } from "express";
import {
  createRoleHandler,
  getRolesHandler,
} from "../controllers/role.controller";

const roleRouter = Router();

roleRouter.post("/", createRoleHandler);

roleRouter.get("/", getRolesHandler);

export default roleRouter;
