import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
      session?: any;
    }
  }
}

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("session", req.headers);

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  // console.log(session);

  if (!session) {
    return res.status(401).send({
      error: "Unauthorized",
      status: 401,
      success: false,
      data: null,
      message: "Unauthorized",
    });
  }

  req.user = session.user;
  req.session = session.session;

  next();
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({
      error: "Forbidden",
      status: 403,
      success: false,
      data: null,
      message: "Forbidden",
    });
  }

  next();
};
