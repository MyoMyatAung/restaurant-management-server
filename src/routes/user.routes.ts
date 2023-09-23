import { Router } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getUsersHandler,
  updateUserHandler,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validateResources";
import { createUserSchema, updateUserSchema } from "../schema/user.schema";

const userRouter = Router();

userRouter.get("/", getUsersHandler);

userRouter.post("/", validate(createUserSchema), createUserHandler);

userRouter.put("/:_id", validate(updateUserSchema), updateUserHandler);

userRouter.delete("/:_id", deleteUserHandler);

export default userRouter;
