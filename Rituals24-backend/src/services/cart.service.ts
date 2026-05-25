import { Cart } from "../models/Cart.model";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";

type ItemType = "Puja" | "Bhajan" | "Temple" | "Pandit" | "PujaKit";

interface AddItemInput {
  itemType: ItemType;
  itemId: string;
  name: string;
  image?: string;
  price: number;
  quantity?: number;
  selectedPoojaId?: string;
  selectedPlanId?: string;
  scheduledDate?: Date;
  scheduledTime?: string;
  notes?: string;
}

interface UpdateItemInput {
  quantity?: number;
  scheduledDate?: Date;
  scheduledTime?: string;
  notes?: string;
}

export const getCart = async (userId: string) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return { userId, items: [], grandTotal: 0 };
  return cart;
};

export const addToCart = async (userId: string, input: AddItemInput) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  // Check if item with same itemId and itemType already exists
  const existingItem = cart.items.find(
    (item) =>
      item.itemId.toString() === input.itemId &&
      item.itemType === input.itemType,
  );

  if (existingItem) {
    // Update quantity if item exists
    existingItem.quantity =
      (existingItem.quantity || 1) + (input.quantity || 1);
  } else {
    // Add new item if it doesn't exist
    cart.items.push(input as any);
  }

  await cart.save();
  return cart;
};

export const updateCartItem = async (
  userId: string,
  cartItemId: string,
  input: UpdateItemInput,
) => {
  const cart = await Cart.findOne({ userId });
  if (!cart)
    throw new AppError(
      "Cart not found",
      StatusCodes.NOT_FOUND,
      "CART_NOT_FOUND",
    );

  const item = cart.items.id(cartItemId);
  if (!item)
    throw new AppError(
      "Cart item not found",
      StatusCodes.NOT_FOUND,
      "CART_ITEM_NOT_FOUND",
    );

  if (input.quantity !== undefined) item.quantity = input.quantity;
  if (input.scheduledDate !== undefined)
    (item as any).scheduledDate = input.scheduledDate;
  if (input.scheduledTime !== undefined)
    (item as any).scheduledTime = input.scheduledTime;
  if (input.notes !== undefined) (item as any).notes = input.notes;

  await cart.save();
  return cart;
};

export const removeFromCart = async (userId: string, cartItemId: string) => {
  const cart = await Cart.findOne({ userId });
  if (!cart)
    throw new AppError(
      "Cart not found",
      StatusCodes.NOT_FOUND,
      "CART_NOT_FOUND",
    );

  const item = cart.items.id(cartItemId);
  if (!item)
    throw new AppError(
      "Cart item not found",
      StatusCodes.NOT_FOUND,
      "CART_ITEM_NOT_FOUND",
    );

  item.deleteOne();
  await cart.save();
  return cart;
};

export const clearCart = async (userId: string) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return { userId, items: [], grandTotal: 0 };

  cart.items = [] as any;
  await cart.save();
  return cart;
};
