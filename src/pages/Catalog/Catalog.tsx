import React, { useEffect } from "react";
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
import { MdArrowBack } from "react-icons/md";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";
import GoToTopComponent from "../../components/reusable/GoToTopComponent/GoToTopComponent";

const Catalog = () => {
  let { id } = useParams();
  const { products, isLoading } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      const newUrl = window.location.pathname + "/All";
      window.history.pushState({ path: newUrl }, "", newUrl);

      id = "All";
    }

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

  if (isLoading) return <SpinnerComponent />;

  return (
    <div>
      <div>
        <ButtonComponent onClick={() => navigate(-1)}>
          <MdArrowBack />
        </ButtonComponent>
        <div>{convertedString}</div>
      </div>
      <div>
        {products?.map((product, index) => {
          return (
            <ProductCardComponent
              id={product.id}
              key={index}
              productKey={index} // key should not be used as a prop.
              title={product.title}
              price={product.price}
              category={product.category}
              description={product.description}
              image={product.image}
              rating={product.rating}
            />
          );
        })}
      </div>
      <GoToTopComponent />
    </div>
  );
};

export default Catalog;
