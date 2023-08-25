import { Router } from "express";
import { validate } from "../middlewares/validateResources";
import { loginSchema, registerSchema } from "../schema/auth.schema";
import { loginHandler, registerHandler } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup", validate(registerSchema), registerHandler);
authRouter.post("/signin", validate(loginSchema), loginHandler);

export default authRouter;
