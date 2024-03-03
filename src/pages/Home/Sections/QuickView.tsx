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
    <section className="section">
      <div className="main-container">
        <p className="section_title_top">Quick View</p>
        <div className="categories">
          <div className="buttonContainer">
            {categoryData?.map((item) => {
              return (
                <div className="button">
                  <input
                    type="radio"
                    id={item.name}
                    name="category"
                    value={item.value}
                    onClick={(
                      e: React.MouseEvent<HTMLInputElement, MouseEvent>
                    ) => handleCategory(e)}
                  />
                  <label className="btn btn-default">{item.name}</label>
                </div>
              );
            })}
          </div>
          <Link
            to={`/catalog/${String(selectedCategory)}`}
            className="viewAllContainer"
          >
            <div className="viewMore">View More</div>
            <MdArrowRightAlt className="icon" />
          </Link>
        </div>
        <div className="productList">
          {products?.slice(0, 8)?.map((product, index) => {
            return (
              <ProductCardComponent
                id={product.id}
                productKey={index}
                title={product.title}
                price={product.price}
                category={product.category}
                description={product.description}
                image={product.image}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickView;
