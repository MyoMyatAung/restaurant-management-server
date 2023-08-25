import { Omit } from "lodash";
import { object, string, TypeOf } from "zod";

export const registerSchema = object({
  body: object({
    username: string({ required_error: "Username is required" }).max(
      20,
      "Username must be under 20 characters"
    ),
    email: string({ required_error: "E-mail is required" }).email(
      "Invalid E-mail format"
    ),
    phone: string({ required_error: "Phone NO. is required" })
      .min(5, "Invalid phone number")
      .max(11, "Invalid phone number"),
    password: string({ required_error: "Password is required" }).min(
      6,
      "Password should be minimum 6 characters"
    ),
    confirmPassword: string({
      required_error: "Password confirm is required",
    }).min(6, "Password should be minimum 6 characters"),
    role: string({
      required_error: "User role is required",
    }),
  }).refine((obj) => obj.password === obj.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  }),
});

export const loginSchema = object({
  body: object({
    email: string({ required_error: "E-mail is required" }).email(
      "Invalid E-mail format"
    ),
    password: string({ required_error: "Password is required" }).min(
      6,
      "Password should be minimum 6 characters"
    ),
  }),
});

export type LoginInput = TypeOf<typeof loginSchema>;

export type RegisterInput = Omit<
  TypeOf<typeof registerSchema>,
  "body.confirmPassword"
>;
