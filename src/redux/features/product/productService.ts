import axiosConfig from "../../utils/axiosConfig";

// DOCS: Products -> Get all products
const getProducts = async () => {
  const response = await axiosConfig.get("products");
  return response.data;
};

// DOCS: Products -> Get a single product
const getProductById = async (id: number) => {
  const response = await axiosConfig.get("products/" + id);
  return response.data;
};

// DOCS: Products -> Get in category
const getCategory = async (data: string) => {
  const response = await axiosConfig.get("/products/category/" + data);

  return response.data;
};

const productService = {
  getProducts,
  getProductById,
  getCategory,
};

export default productService;
