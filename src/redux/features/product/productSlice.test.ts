// test for product reducer
import { ProductType } from "../../../misc/productType";
import productReducer, { getProducts } from "./productSlice";

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
    image: "menimg",
  },
  {
    id: 2,
    title: "product2",
    price: 2,
    description: "product2 desc",
    category: "women",
    image: "womenimg",
  },
  {
    id: 3,
    title: "product3",
    price: 3,
    description: "product3 desc",
    category: "electronics",
    image: "electronicsimg",
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

  // test 2: fulfill
  test("should return a list of products", () => {
    const state = productReducer(
      initialState,
      getProducts.fulfilled(mockProducts, "fulfilled")
    );

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
});

// TODO: TESTING getProductById

// TODO: TESTING getCategory
