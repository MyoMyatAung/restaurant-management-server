import { Request, Response } from "express";
import { CreateUserInput, UpdateUserInput } from "../schema/user.schema";
import { createUser, findUser, updateUser } from "../services/user.service";

/**
 * @GET /api/v1/users
 */
export async function getUsersHandler(req: Request, res: Response) {
  try {
    const users = await findUser();
    return res.status(200).json(users);
  } catch (error) {}
}

/**
 * @POST /api/v1/users
 */
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const createdUser = await createUser(req.body);
    return res.status(201).json(createdUser);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * @PUT /api/v1/users/:_id
 */
export async function updateUserHandler(
  req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>,
  res: Response
) {
  try {
    const updatedUser = await updateUser(req.params, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * @DELETE /api/v1/users/:_id
 */
export async function deleteUserHandler(req: Request, res: Response) {}
