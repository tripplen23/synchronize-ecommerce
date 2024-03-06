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
    <section className="quickview-section bg-gray-100 py-12 dark:bg-gray-900 ">
      <div className="container mx-auto ">
        <h2 className="flex text-3xl font-bold text-gray dark:text-light-800 mb-6 smPhone:justify-center">
          Quick View
        </h2>

        <div className="category-container flex flex-wrap smPhone:flex-col gap-4 items-center justify-between mb-8">
          {/* Category radio */}
          <div className="buttons smPhone:grid grid-cols-2 smPhone:gap-5 flex lg:space-x-4">
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
                  className={`btn btn-default rounded-full py-2 px-4 cursor-pointer hover:text-pink-800 ${
                    selectedCategory === item.name
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {item.name}
                </label>
              </div>
            ))}
          </div>

          {/* View more */}
          <Link
            to={`/catalog/${String(selectedCategory)}`}
            className="view-all flex items-center space-x-2 text-primary hover:text-pink-800"
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
