import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/utils/hooks";
import { Link, useNavigate } from "react-router-dom";
import SpinnerComponent from "../../components/reusable/SpinnerComponent/SpinnerComponent";
import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";
import { MdArrowBack, MdCheck, MdDelete } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { TbTruckReturn } from "react-icons/tb";
import {
  cartReset,
  increaseQuantity,
  decreaseQuantity,
  deleteItemFromCart,
} from "../../redux/features/cart/cartSlice";

const Cart = () => {
  const { cartItems, isLoading } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  if (isLoading) return <SpinnerComponent />;

  return (
    <section className="section">
      <div className="mainContainer">
        <div className="titleContainer">
          <ButtonComponent
            className="iconContainer"
            onClick={() => navigate(-1)}
          >
            <MdArrowBack className="icon" />
          </ButtonComponent>
          <div className="title">Shopping Bag</div>
        </div>

        {cartItems.length ? (
          <div className="content">
            {/* Cart left */}
            <div className="cartLeft">
              {/* Reset cart */}
              <div className="emptyCart" onClick={() => dispatch(cartReset())}>
                Empty Cart
              </div>
              {cartItems.map((item) => {
                return (
                  <div className="cartCardWrapper">
                    <Link
                      to={`/products/${item.product.id}`}
                      className="cartCartContainer"
                    >
                      <img
                        src={item.product.image}
                        className="cartCardImage"
                        alt={item.product.title}
                      />
                      <div className="cartCardDetails">
                        <div className="cartCardLeft">
                          <div className="title">{item.product.title}</div>
                          <div className="size">Size: 36</div>
                          <div className="price">€ {item.product.price}</div>
                          <div className="return">
                            <div className="iconContainer">
                              <TbTruckReturn className="icon" />
                            </div>
                            <div className="title">
                              14 days return available
                            </div>
                          </div>
                          <div className="delivery">
                            <div className="iconContainer">
                              <MdCheck className="icon" />
                            </div>
                            <div className="title">Delivery by 2 days</div>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div className="cartCardRight">
                      <div className="cartCardRightWrapper">
                        <ButtonComponent
                          className="button"
                          onClick={() =>
                            dispatch(decreaseQuantity(item.product))
                          }
                        >
                          -
                        </ButtonComponent>
                        <div className="counter">{item.quantity}</div>
                        <ButtonComponent
                          className="button"
                          onClick={() =>
                            dispatch(increaseQuantity(item.product))
                          }
                        >
                          +
                        </ButtonComponent>
                      </div>
                      <ButtonComponent
                        className="cartCardDelete"
                        onClick={() =>
                          dispatch(deleteItemFromCart(item.product.id))
                        }
                      >
                        <MdDelete className="icon" />
                      </ButtonComponent>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Cart Right */}
            <div className="cartRight">
              <div className="coupon">
                <div className="title">Coupons</div>
                <div className="couponContent">
                  <div className="iconContainer">
                    <BiPurchaseTag className="icon" />
                  </div>
                  <div className="title">Apply Coupons</div>
                  <ButtonComponent className="button">Apply</ButtonComponent>
                </div>
              </div>
              <div className="priceDetails">
                <div className="title">Price Details</div>
                <div className="priceContent">
                  <div className="title">Total MRP</div>
                  <div className="price">{totalPrice.toFixed(2)}</div>
                </div>
                <div className="priceContent">
                  <div className="title">Platform fee</div>
                  <div className="price">FREE</div>
                </div>
                <div className="totalContent">
                  <div className="title">Total Amount</div>
                  <div className="price">{totalPrice.toFixed(2)}</div>
                </div>
                <ButtonComponent className="button">
                  Place Order
                </ButtonComponent>
              </div>
            </div>
          </div>
        ) : (
          <div className="noCartItems">No Items Here</div>
        )}
      </div>
    </section>
  );
};

export default Cart;
