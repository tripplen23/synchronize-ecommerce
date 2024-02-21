import { ModifiedProductType } from "../../../misc/productType";
import axiosConfig from "../../utils/axiosConfig";

// TODO: CRUD

// DOCS: Products -> Get all products
const getProducts = async () => {
  const response = await axiosConfig.get("products");
  return response.data;
};

// DOCS: Products -> Get a single product
const getProductById = async (productId: number) => {
  const response = await axiosConfig.get(`products/${productId}`);
  return response.data;
};

// DOCS: Products -> Get in category
const getCategory = async (categoryData: string) => {
  const response = await axiosConfig.get(`/products/category/${categoryData}`);

  return response.data;
};

// DOCS: Products -> Add new product
const addNewProduct = async (productData: ModifiedProductType) => {
  const response = await axiosConfig.post("products", productData);

  return response.data;
};

// DOCS: Products -> Delete a product
const deleteProduct = async (productId: number) => {
  const response = await axiosConfig.delete(`products/${productId}`);
  return response.data;
};

// DOCS: Products -> Update a product
const updateProduct = async (productId: number, productData: ModifiedProductType) => {
  const response = await axiosConfig.put(`products/${productId}`, productData);
  return response.data;
};

const productService = {
  getProducts,
  getProductById,
  getCategory,
  addNewProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
