import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import {
  getCategory,
  getProducts,
} from "../../redux/features/product/productSlice";
import ProductCardComponent from "../../components/reusable/ProductCardComponent/ProductCardComponent";
import SpinnerComponent from "../../components/reusable/SpinnerComponent/SpinnerComponent";
import { ROUTES } from "../../constants/Route";
import { useNavigate, useParams } from "react-router-dom";
import { categoryData } from "../../data/categoryData";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";
import GoToTopComponent from "../../components/reusable/GoToTopComponent/GoToTopComponent";
import TransitionEffect from "../../components/reusable/TransitionEffect/TransitionEffect";

const Catalog = () => {
  let { id } = useParams();
  const { products, isLoading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    if (!id) {
      const newUrl = window.location.pathname + "/All";
      window.history.pushState({ path: newUrl }, "", newUrl);
      id = "All";
    }

    setCurrentPage(1); // Reset page to 1 when switching categories

    const category = [
      ...categoryData.filter((item) => {
        return item.name === id?.toString();
      }),
    ];
    if (category[0].value !== "all") {
      const pathUrl = ROUTES.filter((item) => {
        return item.name.toLowerCase() === category[0].value.toLowerCase();
      });
      dispatch(getCategory(pathUrl[0].url.toLowerCase()));
    } else {
      dispatch(getProducts());
    }
  }, [id]);

  const convertedString = id
    ?.split("-")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <TransitionEffect />
      {/* header components */}
      <div className="flex items-center justify-between mb-16">
        <ButtonComponent onClick={() => navigate(-1)}>
          <MdArrowBack />
        </ButtonComponent>
        <div></div>
        <h2 className="text-3xl font-bold">{convertedString}</h2>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {currentProducts.map((product, index) => (
          <ProductCardComponent
            id={product.id}
            key={index}
            productKey={index}
            title={product.title}
            price={product.price}
            category={product.category}
            image={product.image}
            rating={product.rating}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`${
              i + 1 === currentPage
                ? "bg-primary text-light"
                : "text-light hover:bg-pink-300 bg-gray-900"
            } mx-1 py-1 px-3 rounded-lg transition-colors`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <GoToTopComponent />
    </div>
  );
};

export default Catalog;
