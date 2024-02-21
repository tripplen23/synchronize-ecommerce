// test for product reducer
import { ModifiedProductType, ProductType } from "../../../misc/productType";
import store from "../../utils/store";
import productReducer, {
  getProducts,
  addNewProduct,
  getProductById,
  getCategory,
  deleteProduct,
  updateProduct,
} from "./productSlice";

const initialState = {
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

// mock data
let mockProducts: ProductType[] = [
  {
    id: 1,
    title: "product1",
    price: 1,
    description: "product1 desc",
    category: "men",
    image: "menimg.png",
  },
  {
    id: 2,
    title: "product2",
    price: 2,
    description: "product2 desc",
    category: "women",
    image: "womenimg.png",
  },
  {
    id: 3,
    title: "product3",
    price: 3,
    description: "product3 desc",
    category: "electronics",
    image: "electronicsimg.png",
  },
];

// TODO: TESTING getProducts
describe("Get all products", () => {
  // test: initial state:
  test("should return initial state", () => {
    const state = productReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  // test 1: pending
  test("should have loading truthy when fetch is pending", () => {
    const state = productReducer(initialState, getProducts.pending("pending"));

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      status: "loading",
    });
  });

  // test 2: fulfill with mockProducts
  test("should return a list of products", () => {
    const state = productReducer(
      initialState,
      getProducts.fulfilled(mockProducts, "fulfilled")
    );

    expect(state.products).toBeDefined();
    expect(state.products[0]).toEqual({
      category: "men",
      description: "product1 desc",
      id: 1,
      image: "menimg.png",
      price: 1,
      title: "product1",
    });
    expect(state).toEqual({
      ...initialState,
      products: mockProducts,
      isSuccess: true,
      status: "success",
    });
  });

  // test 3: error
  test("should handle getProducts rejected action", () => {
    const error = new Error("error");
    const state = productReducer(
      initialState,
      getProducts.rejected(error, "error")
    );
    expect(state).toEqual({
      ...initialState,
      error: error.message,
      status: "error",
    });
  });

  // Test fetching asyncthunk with store dispatch
  test("should fetch all products from api", async () => {
    await store.dispatch(getProducts());
    expect(store.getState().product.products.length).toBe(20);
    expect(store.getState().product.error).toBeNull();
  });
});

// TODO: TESTING getProductById

// TODO: TESTING getCategory

// TODO: TESTING addNewProduct
describe("Add a new product", () => {
  test("Should create a new product", async () => {
    const createdProduct: ModifiedProductType = {
      title: "Dreamless Drugs",
      price: 500,
      description: "Merchandise",
      category: "men's clothing",
      image: "dd.png",
    };
    await store.dispatch(addNewProduct(createdProduct));
    expect(store.getState().product.products.length).toBe(21);
  });
});
// TODO: TESTING deleteProduct
// TODO: TESTING updateProduct
