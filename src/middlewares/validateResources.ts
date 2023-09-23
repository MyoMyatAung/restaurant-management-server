import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
        files: req.files,
      });
      next();
    } catch (error: any) {
      return res.status(400).json({ message: error.issues[0] });
    }
  };

export const validateFormData =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
        files: req.files,
      });
      next();
    } catch (error: any) {
      return res.status(400).json({ message: error.issues[0] });
    }
  };
