import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import { getProducts } from "../../redux/features/product/productSlice";
import ProductCardComponent from "../../components/reusable/ProductCardComponent/ProductCardComponent";

const Catalog = () => {
  const products = useAppSelector((state) => state.product.products);
  const isLoading = useAppSelector((state) => state.product.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatch the action to fetch products when the component mounts
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Catalog</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products?.map((product, index) => (
            <li key={product.id}>
              <ProductCardComponent
                id={product.id}
                key={index}
                title={product.title}
                price={product.price}
                category={product.category}
                description={product.description}
                image={product.image}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Catalog;
