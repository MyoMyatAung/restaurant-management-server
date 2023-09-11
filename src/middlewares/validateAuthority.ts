/**
 * Validate the the authority of the user
 * upon specific features and specific function
 */

import { Request, Response, NextFunction } from "express";
import { PermissionDocument } from "../models/permission.model";

/**
 * Granted Permission function
 */
export enum Func {
  Read = "read",
  Create = "create",
  Update = "update",
  Delete = "delete",
}

export const validateAuthority =
  (feat: string, func: Func) =>
  (req: Request, res: Response, next: NextFunction) => {
    // res.locals.user came from deserializeUser
    const permissions = res.locals.user.role
      .permissions as Array<PermissionDocument>; // The permission of the role of user
    const customPermission = res.locals.user
      .customPermission as Array<PermissionDocument>; // Custom permission of the user

    const isGranted: boolean = Boolean(
      permissions.filter((p) => p.feature === feat && p.granted[func] === true)
        .length ||
        customPermission.filter(
          (p) => p.feature === feat && p.granted[func] === true
        ).length
    ); // Check if the user is granted or not

    if (!isGranted) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return next();
  };
