import React from "react";
import axiosConfig from "../../utils/axiosConfig";
import { CartItemType } from "../../../misc/cartType";
import { ProductType } from "../../../misc/productType";

// DOCS: Cart -> Add new cart
const addNewCart = async (cartItem: CartItemType) => {
  await axiosConfig.post("carts", cartItem);
  return cartItem;
};

// DOCS: Cart -> Delete a cart
const deleteACart = async (Cartid: any) => {
  await axiosConfig.delete("carts", Cartid);

  return Cartid;
};

// update products's quantity in cart

const cartService = {
  addNewCart,
  deleteACart,
};

export default cartService;
