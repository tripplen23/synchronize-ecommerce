import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ModifiedProductType, ProductType } from "../../../misc/productType";
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
  "products/getProducts",
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
  "products/getProductById",
  async (productId: number, thunkAPI) => {
    try {
      return await productService.getProductById(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: Get category
export const getCategory = createAsyncThunk(
  "products/getCategory",
  async (categoryData: string, thunkAPI) => {
    try {
      return await productService.getCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: Add new product
export const addNewProduct = createAsyncThunk(
  "products/addProduct",
  async (productData: ModifiedProductType, thunkAPI) => {
    try {
      return await productService.addNewProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: number, thunkAPI) => {
    try {
      await productService.deleteProduct(productId);
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    {
      productId,
      productData,
    }: { productId: number; productData: ModifiedProductType },
    thunkAPI
  ) => {
    try {
      return await productService.updateProduct(productId, productData);
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

    // TODO: Reducer's cases for addProduct
    builder.addCase(addNewProduct.pending, (state: ProductState) => {
      return {
        ...state,
        isLoading: true,
        error: null,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      addNewProduct.fulfilled,
      (state: ProductState, action: PayloadAction<ProductType>) => {
        return {
          ...state,
          products: [...state.products, action.payload], // Or push
          isLoading: false,
          isSuccess: true,
          error: null,
          status: STATUS.SUCCESS,
        };
      }
    );
    builder.addCase(addNewProduct.rejected, (state: ProductState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });

    // TODO: Reducer's cases for deleteProduct
    builder.addCase(deleteProduct.pending, (state: ProductState) => {
      return {
        ...state,
        isLoading: true,
        error: null,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      deleteProduct.fulfilled,
      (state: ProductState, action: PayloadAction<number>) => {
        // Assuming that the API returns the deleted product's ID
        const deletedProductId = action.payload;
        return {
          ...state,
          products: state.products.filter(
            (product) => product.id !== deletedProductId
          ),
          isLoading: false,
          isSuccess: true,
          error: null,
          status: STATUS.SUCCESS,
        };
      }
    );
    builder.addCase(deleteProduct.rejected, (state: ProductState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });
    // TODO: Reducer's cases for updateProduct
    builder.addCase(updateProduct.pending, (state: ProductState) => {
      return {
        ...state,
        isLoading: true,
        error: null,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      updateProduct.fulfilled,
      (state: ProductState, action: PayloadAction<ProductType>) => {
        // Assuming that the API returns the the updated product
        const updatedProduct = action.payload;
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          ),
          isLoading: false,
          isSuccess: true,
          error: null,
          status: STATUS.SUCCESS,
        };
      }
    );
    builder.addCase(updateProduct.rejected, (state: ProductState, action) => {
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
