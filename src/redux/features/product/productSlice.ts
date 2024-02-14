import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../../misc/productType";
import productService from "./productService";
import { STATUS } from "../../../constants/Status";

interface ProductState {
  products: ProductType[];
  product: ProductType;
  isLoading: boolean;
  isSuccess: boolean;
  error?: string;
  status: string;
}

const initialState: ProductState = {
  products: [],
  product: {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  },
  isLoading: false,
  isSuccess: false,
  error: "",
  status: "",
};

export const getProducts = createAsyncThunk(
  "getProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "getProductById",
  async (id: number, thunkAPI) => {
    try {
      return await productService.getProductById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state: ProductState) => {
      return {
        ...state,
        isLoading: true,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(getProducts.fulfilled, (state: ProductState, action) => {
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        isSuccess: true,
        status: STATUS.SUCCESS,
      };
    });
    builder.addCase(getProducts.rejected, (state: ProductState, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
          status: STATUS.ERROR,
        };
      }
    });
  },
});

const productReducer = productSlice.reducer;

export const { productReset } = productSlice.actions;

export default productReducer;
