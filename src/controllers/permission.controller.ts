import { Request, Response } from "express";
import {
  createPermission,
  findPermission,
} from "../services/permission.service";
import { CreatePermissionInput } from "../schema/permission.schema";

/**
 * @POST /api/v1/permissions
 */
export async function createPermissionHandler(
  req: Request<{}, {}, CreatePermissionInput["body"]>,
  res: Response
) {
  try {
    const createdPermission = await createPermission(req.body);
    return res.status(201).json(createdPermission);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * @GET /api/v1/permissions
 */
export async function getPermissionHandler(req: Request, res: Response) {
  try {
    const permissions = await findPermission();
    if (!permissions.length) {
      return res.status(404).json({ message: "Permission not found" });
    }
    return res.status(200).json(permissions);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
