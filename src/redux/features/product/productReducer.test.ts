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

import { productMSW } from "../../../shared/productMSW";
import { mockProducts } from "../../../data/mockProducts";

beforeAll(() => {
  productMSW.listen();
});

afterAll(() => {
  productMSW.close();
});

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
      category: "men's clothing",
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      id: 1,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      price: 109.95,
      rating: {
        count: 120,
        rate: 3.9,
      },
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
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
describe("Get product by id", () => {
  it("Should return a specific product", async () => {
    const productId: number = 3;
    const result = await store.dispatch(getProductById(productId));
    expect(result.payload.title).toEqual("Mens Cotton Jacket");
    expect(store.getState().product.isSuccess).toBeTruthy();
    expect(store.getState().product.status.toLowerCase()).toEqual("success");
  });
});

// TODO: TESTING addNewProduct
describe("Add a new product(fulfilled)", () => {
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
    expect(store.getState().product.error).toBeNull();
  });
});
// TODO: TESTING deleteProduct
describe("delete a product (fulfilled)", () => {
  test("Should delete a product", async () => {
    const productId: number = 1;
    await store.dispatch(deleteProduct(productId));
    expect(store.getState().product.products.length).toBe(20);
    expect(
      store.getState().product.products.map((product) => product.id)
    ).not.toContain(productId);
    expect(
      store.getState().product.products.map((product) => product.title)
    ).not.toContain("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
  });
});
// TODO: TESTING updateProduct
describe("update a product (fulfilled)", () => {
  it("Should update a product", async () => {
    const productId: number = 3;
    const productData: ModifiedProductType = {
      title: "In the night",
      price: 500,
      description: "Merchandise",
      category: "men's clothing",
      image: "dd.png",
    };
    // Dispatch the updateProduct action

    await store.dispatch(updateProduct({ productId, productData }));
    expect(store.getState().product.products.length).toBe(20);

    const updatedProduct = store
      .getState()
      .product.products.find((product) => product.id === productId);

    expect(updatedProduct?.title).toBe(productData.title);
  });
});

// TODO: TESTING getCategory
describe("Get category", () => {
  it("Should return products in jewelery category", async () => {
    const categoryData: string = "jewelery";
    await store.dispatch(getCategory(categoryData));

    const state = store.getState().product;

    expect(state.isSuccess).toBeTruthy();
    expect(state.status.toLowerCase()).toEqual("success");
    expect(state.isLoading).toBeFalsy();

    const productitles = state.products.map((product) => product.title);
    expect(productitles).toContain(
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet"
    );
  });
});
