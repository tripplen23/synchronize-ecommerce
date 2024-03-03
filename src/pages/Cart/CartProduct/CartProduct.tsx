import React, { FC } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CartItemType } from "../../../misc/cartType";
import { useAppSelector, useAppDispatch } from "../../../redux/utils/hooks";
import SpinnerComponent from "../../../components/reusable/SpinnerComponent/SpinnerComponent";
import ButtonComponent from "../../../components/reusable/ButtonComponent/ButtonComponent";
import {
  decreaseQuantity,
  deleteItemFromCart,
  increaseQuantity,
} from "../../../redux/features/cart/cartSlice";

interface CartProdutProps {
  item: CartItemType;
  onClick: () => void;
}

const CartProduct: FC<CartProdutProps> = ({ item, onClick }) => {
  const { isLoading } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (isLoading) return <SpinnerComponent />;

  return (
    <div className="cartCardWrapper">
      <Link
        to={`/products/${item.product.id}`}
        className="cartCardContainer"
        onClick={onClick}
      >
        <div className="cartCardImage">
          <img src={item.product.image} alt={item.product.title} />
        </div>
        <div className="cartCardDetails">
          <div className="cartCardLeft">
            <div className="title">{item.product.title}</div>
            <div className="size">Size: 36</div>
            <div className="price">€ {item.product.price}</div>
          </div>
        </div>
      </Link>
      <div className="cartCardRight">
        <div className="cartCardRightWrapper">
          <ButtonComponent
            className="button"
            // disabled={item.quantity < 2}
            onClick={() => dispatch(decreaseQuantity(item.product))}
          >
            -
          </ButtonComponent>
          <div className="counter">{item.quantity}</div>
          <ButtonComponent
            className="button"
            onClick={() => dispatch(increaseQuantity(item.product))}
          >
            +
          </ButtonComponent>
        </div>
        <ButtonComponent
          className="cartCardDelete"
          onClick={() => dispatch(deleteItemFromCart(item.product.id))}
        >
          <MdDelete className="icon" />
        </ButtonComponent>
      </div>
    </div>
  );
};

export default CartProduct;
