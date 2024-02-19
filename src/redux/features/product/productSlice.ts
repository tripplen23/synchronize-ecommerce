import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../../misc/productType";
import productService from "./productService";
import { STATUS } from "../../../constants/Status";

interface ProductState {
  products: ProductType[];
  product: ProductType;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
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
  error: null,
  status: "",
};

// TODO: Get All products
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

// TODO: Get product by id
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

// TODO: Get category
export const getCategory = createAsyncThunk(
  "products/getCategory",
  async (data: string, thunkAPI) => {
    try {
      return await productService.getCategory(data);
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
    // TODO: Reducer's cases for getProducts
    builder.addCase(getProducts.pending, (state: ProductState) => {
      return {
        ...state,
        isLoading: true,
        error: null,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      getProducts.fulfilled,
      (state: ProductState, action: PayloadAction<ProductType[]>) => {
        return {
          ...state,
          products: action.payload,
          isLoading: false,
          isSuccess: true,
          error: null,
          status: STATUS.SUCCESS,
        };
      }
    );
    builder.addCase(getProducts.rejected, (state: ProductState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });

    // TODO: Reducer's cases for getProductById
    builder.addCase(getProductById.pending, (state: ProductState) => {
      return {
        ...state,
        isLoading: true,
        error: null,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      getProductById.fulfilled,
      (state: ProductState, action: PayloadAction<ProductType>) => {
        return {
          ...state,
          product: action.payload,
          isLoading: false,
          isSuccess: true,
          error: null,
          status: STATUS.SUCCESS,
        };
      }
    );
    builder.addCase(getProductById.rejected, (state: ProductState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });

    // TODO: Reducer's cases for getCategory
    builder.addCase(getCategory.pending, (state: ProductState) => {
      return {
        ...state,
        isLoading: true,
        error: null,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      getCategory.fulfilled,
      (state: ProductState, action: PayloadAction<ProductType[]>) => {
        return {
          ...state,
          products: action.payload,
          isLoading: false,
          isSuccess: true,
          error: null,
          status: STATUS.SUCCESS,
        };
      }
    );
    builder.addCase(getCategory.rejected, (state: ProductState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });
  },
});

const productReducer = productSlice.reducer;

export const { productReset } = productSlice.actions;

export default productReducer;
