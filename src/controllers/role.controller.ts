import { Request, Response } from "express";
import { createRole, findRoles } from "../services/role.service";
import { CreateRoleInput } from "../schema/role.schema";

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

export async function getRolesHandler(req: Request, res: Response) {
  try {
    const roles = await findRoles({}, { _id: 1, title: 1 });
    return res.status(200).json(roles);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
