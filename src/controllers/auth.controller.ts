import { Request, Response } from "express";
import { LoginInput, RegisterInput } from "../schema/auth.schema";
import { createUser, findUser, validateUser } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

/**
 * @POST /api/v1/auth/register
 */
export async function registerHandler(
  req: Request<{}, {}, RegisterInput["body"]>,
  res: Response
) {
  try {
    const isUserAlreadyExist = await findUser({ email: req.body.email });
    if (isUserAlreadyExist.length) {
      return res.status(409).json({ message: "User already exist" });
    }
    const createdUser = await createUser(req.body);
    return res.status(201).json(createdUser);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * @POST /api/v1/auth/signin
 */
export async function loginHandler(
  req: Request<{}, {}, LoginInput["body"]>,
  res: Response
) {
  try {
    const user = await validateUser(req.body.email, req.body.password);
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }
    const accessToken = signJwt(user, {
      expiresIn: config.get<string>("accessTokenTtl"),
    });
    const refreshToken = signJwt(user, {
      expiresIn: config.get<string>("refreshTokenTtl"),
    });
    return res.status(200).json({ accessToken, refreshToken });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
