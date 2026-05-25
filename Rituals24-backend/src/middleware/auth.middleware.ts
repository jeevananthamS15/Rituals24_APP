import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";
import { Permissions } from "../models/Permissions.model";

type Role = "customer" | "pandit" | "admin" | "subadmin";

interface JwtPayload {
  id: string;
  role: Role;
  permissionId?: string;
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const token: string | undefined = req.cookies?.token;

  if (!token) {
    return next(
      new AppError(
        "Authentication required. Please log in.",
        StatusCodes.UNAUTHORIZED,
      ),
    );
  }

  try {
    const payload = verifyToken<JwtPayload>(token);
    console.log("Authenticated user:", payload);
    req.user = payload;
    next();
  } catch {
    next(new AppError("Invalid or expired token.", StatusCodes.UNAUTHORIZED));
  }
}

export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to perform this action.",
          StatusCodes.FORBIDDEN,
        ),
      );
    }
    next();
  };
}

type PermissionAction = "create" | "read" | "update" | "delete";

interface PermissionDoc {
  permissions: Record<string, Record<PermissionAction, boolean>>;
}

export function checkPermission(resource: string, action: PermissionAction) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return next();

    //  Admin → allow
    if (user.role === "admin") return next();

    //  Not subadmin → allow (customer, normal user)
    if (user.role !== "subadmin") return next();

    //  Subadmin → enforce RBAC
    if (!user.permissionId) {
      return next(
        new AppError(
          "You do not have permission to perform this action.",
          StatusCodes.FORBIDDEN,
        ),
      );
    }

    try {
      const permDoc = await Permissions.findById(user.permissionId).lean();

      if (!permDoc) {
        return next(
          new AppError("Permission record not found.", StatusCodes.FORBIDDEN),
        );
      }

      const resourcePerms = (permDoc as PermissionDoc).permissions[resource];

      if (!resourcePerms || !resourcePerms[action]) {
        return next(
          new AppError(
            "You do not have permission to perform this action.",
            StatusCodes.FORBIDDEN,
          ),
        );
      }

      next();
    } catch {
      next(
        new AppError(
          "Permission check failed.",
          StatusCodes.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  };
}
