import React, { FC } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CartItemType } from "../../../misc/cartType";
import { useAppSelector, useAppDispatch } from "../../../redux/utils/hooks";
import ButtonComponent from "../../../components/reusable/ButtonComponent/ButtonComponent";
import {
  decreaseQuantity,
  deleteItemFromCart,
  increaseQuantity,
} from "../../../redux/features/cart/cartSlice";
import SpinnerComponent from "../../../components/reusable/SpinnerComponent/SpinnerComponent";
import { motion } from "framer-motion";

interface CartProdutProps {
  item: CartItemType;
  onClick: () => void;
}

const CartProduct: FC<CartProdutProps> = ({ item, onClick }) => {
  const { isLoading } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (isLoading) return <SpinnerComponent />;

  const truncateString = (str: string, num: number) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  return (
    <motion.div
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)" }}
      className="cartCardWrapper flex flex-col justify-between py-4 border-b items-center"
    >
      <Link
        to={`/products/${item.product.id}`}
        className="cartCardContainer flex items-center gap-4 mb-4"
        onClick={onClick}
      >
        <div className="w-1/4 flex-shrink-0">
          <img
            src={item.product.image}
            alt={item.product.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col flex-grow ml-4">
          <h3 className="text-lg font-semibold">
            {truncateString(item.product.title, 20)}
          </h3>
          <p className="text-gray-600">€ {item.product.price}</p>
        </div>
      </Link>
      <div className="cartCardRight flex items-center justify-center">
        <div className="cartCardRightWrapper flex items-center gap-4">
          <ButtonComponent
            className="button"
            onClick={() => dispatch(decreaseQuantity(item.product))}
          >
            -
          </ButtonComponent>
          <div className="text-xl font-semibold">{item.quantity}</div>
          <ButtonComponent
            className="button"
            onClick={() => dispatch(increaseQuantity(item.product))}
          >
            +
          </ButtonComponent>
        </div>
        <ButtonComponent
          className="cartCardDelete flex justify-center items-center ml-4"
          onClick={() => dispatch(deleteItemFromCart(item.product.id))}
        >
          <MdDelete className="icon" />
        </ButtonComponent>
      </div>
    </motion.div>
  );
};

export default CartProduct;
