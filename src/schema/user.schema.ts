import { string, object, TypeOf } from "zod";

const body = {
  body: object({
    username: string({ required_error: "Username is required" }),
    email: string({ required_error: "E-mail is required" }).email({
      message: "Invalid E-mail format",
    }),
    phone: string({ required_error: "Phone Number is required" }),
    password: string({ required_error: "Password is required" }).min(
      6,
      "Password must have at least 6 characters"
    ),
    role: string({ required_error: "User role is required" }),
  }),
};

const params = {
  params: object({
    _id: string({ required_error: "Id is required" }),
  }),
};

export const createUserSchema = object({
  ...body,
});

export const updateUserSchema = object({
  ...body,
  ...params,
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
