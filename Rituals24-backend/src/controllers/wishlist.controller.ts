import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { returnSuccessResponse } from "../utils/apiout";
import { StatusCodes } from "../common/errors/statusCodes";
import {
  addToWishlist as addToWishlistService,
  getMyWishlist as getMyWishlistService,
  removeFromWishlist as removeFromWishlistService,
  clearWishlist as clearWishlistService,
} from "../services/wishlist.service";

export const addToWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { itemType, itemId } = req.body;

    const entry = await addToWishlistService(userId, itemType, itemId);
    return returnSuccessResponse(res, StatusCodes.CREATED, entry);
  },
);

export const getMyWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const wishlist = await getMyWishlistService(userId);
    return returnSuccessResponse(res, StatusCodes.OK, wishlist);
  },
);

export const removeFromWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params as { id: string };

    const entry = await removeFromWishlistService(userId, id);
    return returnSuccessResponse(res, StatusCodes.OK, entry);
  },
);

export const clearWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const result = await clearWishlistService(userId);
    return returnSuccessResponse(res, StatusCodes.OK, result);
  },
);
