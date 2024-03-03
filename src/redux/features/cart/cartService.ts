import axiosConfig from "../../utils/axiosConfig";
import { CartItemType } from "../../../misc/cartType";
import { ProductType } from "../../../misc/productType";

const fetchCartItems = async () => {
  try {
    const response = await axiosConfig.get("carts");
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart: ", error);
    throw error;
  }
};

const addToCart = async (cartItem: CartItemType) => {
  try {
    await axiosConfig.post("carts", cartItem);
    return cartItem;
  } catch (error) {
    console.error("Error adding item to cart: ", error);
    throw error;
  }
};

const deleteItemFromCart = async (cartId: number) => {
  try {
    await axiosConfig.post(`carts/${cartId}`);
    return cartId;
  } catch (error) {
    console.error("Error removing item from cart: ", error);
    throw error;
  }
};

const decreaseQuantity = async (productInCart: ProductType) => {
  try {
    await axiosConfig.post("carts", productInCart);
    return productInCart;
  } catch (error) {
    console.error("Error decreasing item quantity in cart:", error);
    throw error;
  }
};

const increaseQuantity = async (productInCart: ProductType) => {
  try {
    await axiosConfig.post("carts", productInCart);

    return productInCart;
  } catch (error) {
    console.error("Error increasing item quantity in cart:", error);
    throw error;
  }
};

const cartService = {
  fetchCartItems,
  addToCart,
  deleteItemFromCart,
  decreaseQuantity,
  increaseQuantity,
};

export default cartService;
