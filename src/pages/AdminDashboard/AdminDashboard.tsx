import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import {
  getProducts,
  addNewProduct,
  deleteProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";
import { ModifiedProductType, ProductType } from "../../misc/productType";
import AddingModalComponent from "../../components/reusable/ModalComponents/AddingModalComponent";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";

const AdminDashboard = () => {
  const products = useAppSelector((state) => state.product.products);
  const isLoading = useAppSelector((state) => state.product.isLoading);
  const dispatch = useAppDispatch();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);

  // TODO: Fetch product on component mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // TODO: Handler for adding / updating / deleting products
  const handleAdd = (productData: ModifiedProductType) => {
    dispatch(addNewProduct(productData));
    setIsAddingModalOpen(false);
  };

  const handleUpdate = (productId: number, productData: ProductType) => {
    dispatch(updateProduct({ productId, productData }));
  };

  const handleDelete = (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  // Calculate total number of pages:
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get current page products:
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <br />
        <ButtonComponent>Admin profile</ButtonComponent>
      </div>

      <div className="bg-light dark:bg-dark p-8 rounded shadow">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Product list</h2>
              <div className="flex space-x-3">
                <ButtonComponent onClick={() => setIsAddingModalOpen(true)}>
                  + Add Product
                </ButtonComponent>
              </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    Product ID
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Product title
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageProducts().map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3">{product.id}</td>
                    <td className="px-4 py-3">{product.title}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">{product.description}</td>
                    <td className="px-4 py-3">{product.price}</td>
                    <td className="px-4 py-3">
                      <span
                        className="cursor-pointer text-blue-500 mr-2 hover:underline"
                        onClick={() => handleUpdate(product.id, product)}
                      >
                        Update
                      </span>
                      <span
                        className="cursor-pointer text-red-500"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <ButtonComponent
                onClick={() =>
                  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                }
                disabled={currentPage === 1}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Prev
              </ButtonComponent>
              <span>{`${currentPage} of ${totalPages}`}</span>
              <ButtonComponent
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    Math.min(prevPage + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Next
              </ButtonComponent>
            </div>

            <AddingModalComponent
              isOpen={isAddingModalOpen}
              onClose={() => setIsAddingModalOpen(false)}
              onAdd={handleAdd}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
