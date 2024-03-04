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
    <section className="section py-10 px-5">
      <div className="mainContainer flex flex-col md:flex-row justify-around mx-auto max-w-7xl">
        {cartItems.length ? (
          <div className="content grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cart left */}
            <div className="cartLeft space-y-8 mr-8">
              <div className="titleContainer flex items-center mb-8 md:mb-0">
                <ButtonComponent
                  className="iconContainer mr-2"
                  onClick={() => navigate(-1)}
                >
                  <MdArrowBack className="icon" />
                </ButtonComponent>
                <h1 className="text-2xl font-semibold text-gray-800">
                  Shopping Bag
                </h1>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="cartCardWrapper border rounded-lg overflow-hidden shadow-lg bg-white"
                >
                  <Link
                    to={`/products/${item.product.id}`}
                    className="cartCartContainer flex items-center gap-4 p-4"
                  >
                    <div className="w-20 h-20 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {item.product.title}
                      </h3>
                      <p className="text-gray-600">Size: 36</p>
                      <p className="text-primary">€ {item.product.price}</p>
                      <div className="return flex items-center text-gray-600">
                        <TbTruckReturn className="icon mr-1" />
                        <span>14 days return available</span>
                      </div>
                      <div className="delivery flex items-center text-gray-600">
                        <MdCheck className="icon mr-1" />
                        <span>Delivery by 2 days</span>
                      </div>
                    </div>
                  </Link>

                  <div className="cartCardRight flex items-center justify-between p-4">
                    <div className="cartCardRightWrapper flex items-center gap-4">
                      <ButtonComponent
                        className="button"
                        onClick={() => dispatch(decreaseQuantity(item.product))}
                      >
                        -
                      </ButtonComponent>
                      <div className="text-xl font-semibold">
                        {item.quantity}
                      </div>
                      <ButtonComponent
                        className="button"
                        onClick={() => dispatch(increaseQuantity(item.product))}
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
              ))}

              {/* Reset cart */}
              <div
                className="emptyCart text-red-500 font-semibold cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => dispatch(cartReset())}
              >
                Empty Cart
              </div>
            </div>
            {/* Cart Right */}
            <div className="cartRight mt-16">
              <div className="coupon bg-white border rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Coupons</h2>
                <div className="couponContent flex items-center gap-4">
                  <BiPurchaseTag className="icon" />
                  <div className="flex-grow">
                    <h3 className="text-base font-medium text-gray-800">
                      Apply Coupons
                    </h3>
                    <ButtonComponent className="button">Apply</ButtonComponent>
                  </div>
                </div>
              </div>
              <div className="priceDetails bg-white border rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Price Details</h2>
                <div className="priceContent flex justify-between">
                  <div className="title">Total MRP</div>
                  <div className="price">€{totalPrice.toFixed(2)}</div>
                </div>
                <div className="priceContent flex justify-between">
                  <div className="title">Platform fee</div>
                  <div className="price">FREE</div>
                </div>
                <div className="totalContent flex justify-between items-center mt-4">
                  <div className="title text-lg font-semibold">
                    Total Amount
                  </div>
                  <div className="price text-lg font-semibold">
                    €{totalPrice.toFixed(2)}
                  </div>
                </div>
                <ButtonComponent className="button mt-6 w-full">
                  Place Order
                </ButtonComponent>
              </div>
            </div>
          </div>
        ) : (
          <div className="noCartItems text-center text-gray-600 text-lg">
            No Items Here
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
