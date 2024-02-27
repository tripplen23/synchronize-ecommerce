import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType } from "../../../misc/cartType";
import cartService from "./cartService";
import { STATUS } from "../../../constants/Status";

interface CartState {
  cartItems: CartItemType[];
  totalItems: number;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  status: string;
}

const initialState: CartState = {
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
  async (cartId: number, thunkAPI) => {
    try {
      return await cartService.decreaseQuantity(cartId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: Increase quantity
export const increaseQuantity = createAsyncThunk(
  "cart/increase",
  async (cartId: number, thunkAPI) => {
    try {
      return await cartService.increaseQuantity(cartId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
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
        const itemIndex = state.cartItems.findIndex(
          (item) => item.product.id == action.payload.product.id
        );
        if (itemIndex >= 0) {
          // If the item is already in the cart
          state.cartItems[itemIndex].quantity += 1;
          state.totalItems += 1;
        } else {
          const product = { ...action.payload, quantity: 1 };
          state.totalItems += 1;
          state.cartItems.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(state.cartItems));

        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          error: null,
          status: STATUS.SUCCESS,
        };
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
        const cartItemId = action.payload;
        const updatedCart = state.cartItems.filter(
          (item) => item.product.id !== cartItemId
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
    // TODO: Reducer's cases for increaseQuantity
  },
});

const cartReducer = cartSlice.reducer;

export const { cartReset } = cartSlice.actions;
export default cartReducer;
