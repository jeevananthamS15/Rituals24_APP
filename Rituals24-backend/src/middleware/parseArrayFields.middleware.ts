// src/middleware/parseArrayFields.middleware.ts
import { Request, Response, NextFunction } from "express";

export function parseArrayFields(fields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      if (typeof req.body[field] === "string") {
        // Try to parse as JSON (for arrays/objects)
        try {
          req.body[field] = JSON.parse(req.body[field]);
          continue;
        } catch {
          // If not JSON, try to parse as number
          const num = parseFloat(req.body[field]);
          if (!isNaN(num) && req.body[field].trim() !== "") {
            req.body[field] = num;
          }
        }
      }
    }
    next();
  };
}
