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
import UpdatingModalComponent from "../../components/reusable/ModalComponents/UpdatingModalComponent";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";
import { Link } from "react-router-dom";
import SpinnerComponent from "../../components/reusable/SpinnerComponent/SpinnerComponent";
import { getUser } from "../../redux/features/auth/authSlice";
import TransitionEffect from "../../components/reusable/TransitionEffect/TransitionEffect";

const AdminDashboard = () => {
  const { products, isLoading } = useAppSelector((state) => state.product);
  const { user, token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [isUpdatingModalOpen, setIsUpdatingModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  // TODO: Fetch product on component mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // TODO: Fetch user information
  useEffect(() => {
    const userId: number = Number(localStorage.getItem("userIdDemo"));
    dispatch(getUser(userId));
  }, [dispatch]);

  // TODO: Handler for adding / updating / deleting products
  const handleAdd = (productData: ModifiedProductType) => {
    dispatch(addNewProduct(productData));
    setIsAddingModalOpen(false);
  };

  const handleUpdateClick = (product: ProductType) => {
    setSelectedProduct(product);
    setIsUpdatingModalOpen(true);
  };

  const handleUpdate = (updatedProductData: ProductType) => {
    if (selectedProduct) {
      dispatch(
        updateProduct({
          productId: updatedProductData.id,
          productData: updatedProductData,
        })
      );
    }
    setIsUpdatingModalOpen(false);
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
    <div className="container mx-auto mt-8 mb-8 ipadMini:my-20">
      <TransitionEffect />
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <br />
        <div className="profileInfo flex flex-col">
          <span className="name">
            Admin Name: {`${user?.name.firstname} ${user?.name.lastname}`}
          </span>
          <span className="email">
            Email: <strong>{user?.email}</strong>
          </span>
        </div>
      </div>

      <div className="bg-light dark:bg-dark p-8 rounded shadow ipadMini:hidden">
        {isLoading ? (
          <div>
            <SpinnerComponent />
          </div>
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

            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                    <td className="px-4 py-3 text-dark dark:text-light">
                      {product.id}
                    </td>
                    <td className="px-4 py-3 text-primary underline">
                      <Link to={`/products/${String(product.id)}`}>
                        {product.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-dark dark:text-light">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 text-dark dark:text-light">
                      {product.description}
                    </td>
                    <td className="px-4 py-3 text-dark dark:text-light">
                      {product.price}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="cursor-pointer text-blue-500 dark:text-primaryLight mr-2 hover:underline"
                        onClick={() => handleUpdateClick(product)}
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
            {selectedProduct && (
              <UpdatingModalComponent
                isOpen={isUpdatingModalOpen}
                onClose={() => setIsUpdatingModalOpen(false)}
                onUpdate={handleUpdate}
                product={selectedProduct}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
