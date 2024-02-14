import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import { getProducts } from "../../redux/features/product/productSlice";

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
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Catalog;
