import { Request, Response } from "express";
import { createRole, findRoles, updateRoles } from "../services/role.service";
import { CreateRoleInput, UpdateRoleInput } from "../schema/role.schema";

/**
 * @POST /api/v1/roles
 */
export async function createRoleHandler(
  req: Request<{}, {}, CreateRoleInput["body"]>,
  res: Response
) {
  try {
    const createdRole = await createRole(req.body);
    return res.status(201).json(createdRole);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * @GET /api/v1/roles
 */
export async function getRolesHandler(req: Request, res: Response) {
  try {
    const roles = await findRoles();
    return res.status(200).json(roles);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * @PUT /api/v1/roles/:_id
 */
export async function updateRoleHandler(
  req: Request<UpdateRoleInput["params"], {}, UpdateRoleInput["body"]>,
  res: Response
) {
  try {
    const updatedRole = await updateRoles(req.params, req.body);
    if (!updatedRole) {
      return res.status(404).json({ message: "Role Not Found" });
    }
    return res.status(200).json(updatedRole);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
