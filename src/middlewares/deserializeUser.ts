import { NextFunction, Request, Response } from "express";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { omit } from "lodash";
import config from "config";

export function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  const refreshToken = req.headers["x-refresh-token"] as string;

  // NO ACCESS TOKEN
  if (!accessToken) {
    return next();
  }

  // ACCESS TOKEN
  const { decoded, expired, valid } = verifyJwt(accessToken);

  if (valid && !!decoded) {
    res.locals.user = decoded;
    return next();
  }

  // EXPIRED OR INVALID ACCESS TOKEN
  if (expired || !valid || !decoded) {
    // NO REFRESH TOKEN
    if (!refreshToken) {
      return next();
    }

    // REFRESH TOKEN
    const {
      decoded: rDecoded,
      expired: rExpired,
      valid: rValid,
    } = verifyJwt(refreshToken);

    // REFRESH TOKEN IS INVALID OR EXPIRED
    if (!rDecoded || !rValid || rExpired) {
      return next();
    }

    // REFRESH TOKEN IS VALID
    const newAccessToken = signJwt(
      omit(rDecoded as Object, ["exp", "iat"]) as Object,
      {
        expiresIn: config.get<string>("accessTokenTtl"),
      }
    );
    res.setHeader("x-access-token", newAccessToken);
    res.locals.user = rDecoded;
    return next();
  }

  return next();
}
