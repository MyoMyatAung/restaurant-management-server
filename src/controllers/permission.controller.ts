import { Request, Response } from "express";
import {
  createPermission,
  findPermission,
  updatePermission,
} from "../services/permission.service";
import {
  CreatePermissionInput,
  UpdatePermissionInput,
} from "../schema/permission.schema";

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

/**
 * @PUT /api/v1/permissions/:_id
 */
export async function updatePermissionHandler(
  req: Request<
    UpdatePermissionInput["params"],
    {},
    UpdatePermissionInput["body"]
  >,
  res: Response
) {
  try {
    const updatedPermission = await updatePermission(req.params, req.body);
    if (!updatedPermission) {
      return res.status(404).json({ message: "Permission Not Found" });
    }
    return res.status(200).json(updatedPermission);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
