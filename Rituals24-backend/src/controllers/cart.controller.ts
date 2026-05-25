import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { returnSuccessResponse } from "../utils/apiout";
import { StatusCodes } from "../common/errors/statusCodes";
import {
  getCart as getCartService,
  addToCart as addToCartService,
  updateCartItem as updateCartItemService,
  removeFromCart as removeFromCartService,
  clearCart as clearCartService,
} from "../services/cart.service";

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const cart = await getCartService(userId);
  return returnSuccessResponse(res, StatusCodes.OK, cart);
});

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const cart = await addToCartService(userId, req.body);
  return returnSuccessResponse(res, StatusCodes.CREATED, cart);
});

export const updateCartItem = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { itemId } = req.params as { itemId: string };
    const cart = await updateCartItemService(userId, itemId, req.body);
    return returnSuccessResponse(res, StatusCodes.OK, cart);
  },
);

export const removeFromCart = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { itemId } = req.params as { itemId: string };
    const cart = await removeFromCartService(userId, itemId);
    return returnSuccessResponse(res, StatusCodes.OK, cart);
  },
);

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const cart = await clearCartService(userId);
  return returnSuccessResponse(res, StatusCodes.OK, cart);
});
