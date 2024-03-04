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
    <div className="cartCardWrapper flex flex-col justify-between py-4 border-b">
      <Link
        to={`/products/${item.product.id}`}
        className="cartCardContainer flex items-center gap-4 w-1/2"
        onClick={onClick}
      >
        <div className="w-16 h-16 overflow-hidden">
          <img
            src={item.product.image}
            alt={item.product.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">
            {truncateString(item.product.title, 20)}
          </h3>
          <p className="text-gray-600">€ {item.product.price}</p>
        </div>
      </Link>
      <div className="cartCardRight flex items-center">
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
    </div>
  );
};

export default CartProduct;
