import { Express, Request, Response } from "express";

function routes(app: Express) {
  app.get("/health-check", (req: Request, res: Response) => {
    return res.status(200);
  });
}

export default routes;
