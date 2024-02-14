import axiosConfig from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axiosConfig.get("products");
  return response.data;
};

const getProductById = async (id: number) => {
  const response = await axiosConfig.get("products/" + id);
  return response.data;
};

const productService = {
  getProducts,
  getProductById,
};

export default productService;
