import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType } from "../../../misc/cartType";
import cartService from "./cartService";
import { STATUS } from "../../../constants/Status";

interface CartState {
  cartItem: CartItemType[];
  totalItem: number;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  status: string;
}

const initialState: CartState = {
  cartItem: [],
  totalItem: 0,
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
export const addNewCart = createAsyncThunk(
  "cart/add",
  async (cartItem: CartItemType, thunkAPI) => {
    try {
      const result = await cartService.addNewCart(cartItem);
      console.log("Add to cart", result);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: Delete a cart
export const deleteACart = createAsyncThunk(
  "cart/remove",
  async (cartId: number, thunkAPI) => {
    try {
      return await cartService.deleteACart(cartId);
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
          cartItem: action.payload,
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

    // TODO: Reducer's cases for addNewCart
    // TODO: Reducer's cases for deleteACart
    // TODO: Reducer's cases for decreaseQuantity
    // TODO: Reducer's cases for increaseQuantity
  },
});

const cartReducer = cartSlice.reducer;

export const { cartReset } = cartSlice.actions;
export default cartReducer;
