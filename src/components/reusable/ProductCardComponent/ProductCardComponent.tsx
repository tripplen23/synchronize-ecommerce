import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../../../misc/productType";
import { useAppDispatch } from "../../../redux/utils/hooks";
import { CartItemType } from "../../../misc/cartType";
import { addNewCart } from "../../../redux/features/cart/cartSlice";
import { motion } from "framer-motion";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { CgShoppingBag } from "react-icons/cg";

interface ProductCardComponentProps extends ProductType {
  key: number;
}

const ProductCardComponent: FC<ProductCardComponentProps> = ({
  id,
  key,
  title,
  price,
  description,
  category,
  image,
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
      },
    };

    dispatch(addNewCart(cartProduct)).then(() => {
      setIsLoadingProduct(false);
    });
  };

  return (
    // TODO: Product card
    <motion.div
      id={title}
      key={key}
      tabIndex={id}
      whileHover={{ cursor: "pointer" }}
      whileTap={{ cursor: "grabbing" }}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
    >
      <div>
        <div>
          <Link to={`/products/${String(id)}`}>
            <img src={image} alt={title} />
          </Link>
        </div>
        <div>{title}</div>
        <div>{price}</div>
        {/* TODO: Add to cart button: */}
        <motion.div
          key={key}
          onClick={() => addToCartHandler()}
          whileHover={{ zoom: 1.2 }}
        >
          <ButtonComponent className="">
            {isLoadingProduct && <p>Loading</p>}
            <CgShoppingBag className="" />
          </ButtonComponent>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCardComponent;
