import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../../../misc/productType";
import { useAppDispatch } from "../../../redux/utils/hooks";
import { CartItemType } from "../../../misc/cartType";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import { motion } from "framer-motion";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import SpinnerComponent from "../SpinnerComponent/SpinnerComponent";
import { CgShoppingBag } from "react-icons/cg";

interface ProductCardComponentProps extends ProductType {
  productKey: number;
}

const ProductCardComponent: FC<ProductCardComponentProps> = ({
  id,
  productKey,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  const dispatch = useAppDispatch();

  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(false);

  const addToCartHandler = () => {
    setIsLoadingProduct(true);

    const cartProduct: CartItemType = {
      quantity: 1,
      product: {
        id: id,
        title: title,
        price: price,
        image: image,
        description: description,
        category: category,
        rating: rating,
      },
    };

    dispatch(addToCart(cartProduct)).then(() => {
      setIsLoadingProduct(false);
    });
  };

  return (
    // TODO: Product card
    <motion.div
      id={title}
      key={productKey}
      tabIndex={id}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
      className="flex flex-col "
    >
      {/* Product item */}

      <div>
        <div className="w-full max-w-40 cursor: pointer">
          <Link to={`/products/${String(id)}`}>
            <img src={image} alt={title} />
          </Link>
        </div>
      </div>

      {/* Product details container */}
      <div>
        <div>{title}</div>
        <div>{price}€</div>
      </div>

      {/* TODO: Add to cart button: */}
      <motion.div
        key={productKey}
        onClick={() => addToCartHandler()}
        whileHover={{ zoom: 1.2 }}
      >
        <ButtonComponent className="">
          {isLoadingProduct ? (
            <SpinnerComponent className="h-4 w-4" />
          ) : (
            <CgShoppingBag className="" />
          )}
        </ButtonComponent>
      </motion.div>
    </motion.div>
  );
};

export default ProductCardComponent;
