import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import {
  getCategory,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { ROUTES } from "../../../constants/Route";
import { categoryData } from "../../../data/categoryData";
import { Link } from "react-router-dom";
import { MdArrowRightAlt } from "react-icons/md";
import ProductCardComponent from "../../../components/reusable/ProductCardComponent/ProductCardComponent";

const QuickView = () => {
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleCategory = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;
    setSelectedCategory(target.id);
    if (target.value !== "all") {
      const pathUrl = ROUTES.filter((item) => {
        return item.name.toLowerCase() === target.value.toLowerCase();
      });
      dispatch(getCategory(pathUrl[0].url.toLowerCase()));
    } else {
      dispatch(getProducts());
    }
  };

  return (
    <section className="quickview-section bg-gray-100 py-12 dark:bg-dark">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Quick View</h2>
        <div className="category-container flex flex-wrap gap-4 items-center justify-between mb-8">
          <div className="buttons flex space-x-4">
            {categoryData?.map((item) => (
              <div key={item.value} className="button">
                <input
                  type="radio"
                  id={item.name}
                  name="category"
                  value={item.value}
                  className="hidden"
                  onClick={(e) => handleCategory(e)}
                />
                <label
                  htmlFor={item.name}
                  className={`btn btn-default rounded-full py-2 px-4 cursor-pointer ${
                    selectedCategory === item.name
                      ? "bg-gray-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {item.name}
                </label>
              </div>
            ))}
          </div>
          <Link
            to={`/catalog/${String(selectedCategory)}`}
            className="view-all flex items-center space-x-2 text-blue-500 hover:text-blue-700"
          >
            <div className="text-lg">View More</div>
            <MdArrowRightAlt className="icon" />
          </Link>
        </div>
        <div className="product-list grid grid-cols-2 md:grid-cols-4 gap-6">
          {products?.slice(0, 8)?.map((product, index) => (
            <ProductCardComponent
              key={product.id}
              productKey={index}
              id={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              image={product.image}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickView;
