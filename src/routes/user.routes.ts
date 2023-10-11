import { Router } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getUsersHandler,
  updateUserHandler,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validateResources";
import { createUserSchema, updateUserSchema } from "../schema/user.schema";
import { Func, funName, validateAuthority } from "../middlewares/validateAuthority";

const funcName = funName.user.key;

const userRouter = Router();

userRouter.get("/", validateAuthority(funcName, Func.Read), getUsersHandler);

userRouter.post("/", validateAuthority(funcName, Func.Create), validate(createUserSchema), createUserHandler);

userRouter.put("/:_id", validateAuthority(funcName, Func.Update), validate(updateUserSchema), updateUserHandler);

userRouter.delete("/:_id", validateAuthority(funcName, Func.Delete), deleteUserHandler);

export default userRouter;
