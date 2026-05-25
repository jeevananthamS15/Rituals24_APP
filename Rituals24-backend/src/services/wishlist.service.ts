import { Wishlist } from "../models/Wishlist.model";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";

type WishlistItemType = "puja" | "pujaKit" | "pandit" | "temple" | "bhajan";

const itemTypeToField: Record<WishlistItemType, string> = {
  puja: "pujaId",
  pujaKit: "pujaKitId",
  pandit: "panditId",
  temple: "templeId",
  bhajan: "bhajanId",
};

export const addToWishlist = async (
  userId: string,
  itemType: WishlistItemType,
  itemId: string,
) => {
  const field = itemTypeToField[itemType];

  const existing = await Wishlist.findOne({ userId, [field]: itemId });
  if (existing) {
    throw new AppError(
      "Item already in wishlist",
      StatusCodes.CONFLICT,
      "WISHLIST_DUPLICATE",
    );
  }

  const entry = await Wishlist.create({ userId, [field]: itemId });
  return entry;
};

export const getMyWishlist = async (userId: string) => {
  return Wishlist.find({ userId })
    .populate("pujaId")
    .populate("pujaKitId")
    .populate("panditId")
    .populate("templeId")
    .populate("bhajanId")
    .sort({ createdAt: -1 });
};

export const removeFromWishlist = async (
  userId: string,
  wishlistId: string,
) => {
  const entry = await Wishlist.findOneAndDelete({ _id: wishlistId, userId });
  if (!entry) {
    throw new AppError(
      "Wishlist item not found",
      StatusCodes.NOT_FOUND,
      "WISHLIST_NOT_FOUND",
    );
  }
  return entry;
};

export const clearWishlist = async (userId: string) => {
  const result = await Wishlist.deleteMany({ userId });
  return { deletedCount: result.deletedCount };
};
