import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType } from "../../../misc/cartType";
import cartService from "./cartService";
import { STATUS } from "../../../constants/Status";
import { ProductType } from "../../../misc/productType";

interface CartState {
  cartItems: CartItemType[];
  totalItems: number;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  status: string;
}

export const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  isLoading: false,
  isSuccess: false,
  error: null,
  status: "",
};

// TODO: Fetch current cart items
export const fetchCartItems = createAsyncThunk("cart/fetch", async () => {
  try {
    return await cartService.fetchCartItems();
  } catch (error) {
    throw error;
  }
});

// TODO: Add new cart item
export const addToCart = createAsyncThunk(
  "cart/add",
  async (cartItem: CartItemType, thunkAPI) => {
    try {
      const result = await cartService.addToCart(cartItem);
      console.log("Add to cart", result);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: Delete a cart
export const deleteItemFromCart = createAsyncThunk(
  "cart/remove",
  async (cartId: number, thunkAPI) => {
    try {
      return await cartService.deleteItemFromCart(cartId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: Decrease quantity
export const decreaseQuantity = createAsyncThunk(
  "cart/decrease",
  async (productInCart: ProductType, thunkAPI) => {
    try {
      return await cartService.decreaseQuantity(productInCart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: Increase quantity
export const increaseQuantity = createAsyncThunk(
  "cart/increase",
  async (productInCart: ProductType, thunkAPI) => {
    try {
      return await cartService.increaseQuantity(productInCart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartReset: () => initialState,
  },

  extraReducers: (builder) => {
    // TODO: Reducer's cases for fetchCartItems
    builder.addCase(fetchCartItems.pending, (state: CartState) => {
      return {
        ...state,
        isLoading: true,
        error: null,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      fetchCartItems.fulfilled,
      (state: CartState, action: PayloadAction<CartItemType[]>) => {
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          error: null,
          cartItems: action.payload,
          status: STATUS.SUCCESS,
        };
      }
    );
    builder.addCase(fetchCartItems.rejected, (state: CartState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });

    // TODO: Reducer's cases for addToCart
    builder.addCase(addToCart.pending, (state: CartState) => {
      return {
        ...state,
        isLoading: true,
        error: null,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      addToCart.fulfilled,
      (state: CartState, action: PayloadAction<CartItemType>) => {
        state.isLoading = false;
        state.isSuccess = true;
        const itemIndex = state.cartItems.findIndex(
          (item) => item.product.id === action.payload.product.id
        );
        if (itemIndex >= 0) {
          // If the item is already in the cart -> increase its quality by 1
          state.cartItems[itemIndex].quantity += 1;
          state.totalItems += 1;
        } else {
          // If the item is not in the cart -> add it into to cart
          const addedItem = { ...action.payload, quantity: 1 };
          state.totalItems += 1;
          state.cartItems.push(addedItem);
        }

        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(addToCart.rejected, (state: CartState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });

    // TODO: Reducer's cases for deleteItemFromCart
    builder.addCase(deleteItemFromCart.pending, (state: CartState) => {
      return {
        ...state,
        isLoading: true,
        error: null,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      deleteItemFromCart.fulfilled,
      (state: CartState, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.isSuccess = true;

        const updatedCart = state.cartItems.filter(
          (item) => item.product.id !== action.payload
        );
        state.cartItems = updatedCart;
        state.totalItems = state.cartItems.reduce(
          (total: number, curr: CartItemType) => (total += curr.quantity),
          0
        );
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(deleteItemFromCart.rejected, (state: CartState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });

    // TODO: Reducer's cases for decreaseQuantity
    builder.addCase(decreaseQuantity.pending, (state: CartState) => {
      return {
        ...state,
        isLoading: true,
        error: null,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      decreaseQuantity.fulfilled,
      (state: CartState, action: PayloadAction<ProductType>) => {
        state.isLoading = false;
        state.isSuccess = true;
        const productIndex = state.cartItems.findIndex(
          (item) => item.product.id === action.payload.id
        );

        if (state.cartItems[productIndex].quantity > 1) {
          // If the quantity of the product > 1 -> decrease the quantity by 1
          state.cartItems[productIndex].quantity -= 1;
          state.totalItems -= 1;
        } else if (state.cartItems[productIndex].quantity === 1) {
          // If the quantity of the product = 1 -> delete this product outa the cart
          const updatedCart = state.cartItems.filter(
            (item) => item.product.id !== action.payload.id
          );
          state.cartItems = updatedCart;
          state.totalItems -= 1;
        }

        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(decreaseQuantity.rejected, (state: CartState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });

    // TODO: Reducer's cases for increaseQuantity
    builder.addCase(increaseQuantity.pending, (state: CartState) => {
      return {
        ...state,
        isLoading: true,
        error: null,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      increaseQuantity.fulfilled,
      (state: CartState, action: PayloadAction<ProductType>) => {
        state.isLoading = false;
        state.isSuccess = true;
        const productIndex = state.cartItems.findIndex(
          (item) => item.product.id === action.payload.id
        );

        if (state.cartItems[productIndex].quantity >= 1) {
          // If the product exists in the cart
          state.cartItems[productIndex].quantity += 1;
          state.totalItems += 1;
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        state.status = STATUS.SUCCESS;
      }
    );
    builder.addCase(increaseQuantity.rejected, (state: CartState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });
  },
});

const cartReducer = cartSlice.reducer;

export const { cartReset } = cartSlice.actions;
export default cartReducer;
