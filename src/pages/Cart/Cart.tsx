import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/utils/hooks";
import { Link, useNavigate } from "react-router-dom";

import ButtonComponent from "../../components/reusable/ButtonComponent/ButtonComponent";
import { MdArrowBack, MdCheck, MdDelete } from "react-icons/md";

import { TbTruckReturn } from "react-icons/tb";
import {
  cartReset,
  increaseQuantity,
  decreaseQuantity,
  deleteItemFromCart,
} from "../../redux/features/cart/cartSlice";
import { motion } from "framer-motion";
import TransitionEffect from "../../components/reusable/TransitionEffect/TransitionEffect";

const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  return (
    <section className="section py-10 px-5">
      <TransitionEffect />
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
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-light">
                  Shopping Bag
                </h1>
              </div>

              {cartItems.map((item) => (
                <motion.div
                  transition={{
                    ease: "easeInOut",
                    duration: 0.4,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                  }}
                  key={item.product.id}
                  className="cartCardWrapper border rounded-lg overflow-hidden shadow-lg bg-white"
                >
                  <Link
                    to={`/products/${item.product.id}`}
                    className="cartCartContainer flex items-center gap-4 p-4"
                  >
                    <div className="w-1/6 flex-shrink-0">
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
                        onClick={() => dispatch(decreaseQuantity(item.product.id))}
                      >
                        -
                      </ButtonComponent>
                      <div className="text-xl font-semibold dark:text-dark">
                        {item.quantity}
                      </div>
                      <ButtonComponent
                        className="button"
                        onClick={() => dispatch(increaseQuantity(item.product.id))}
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
                </motion.div>
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
              <div className="coupon bg-light border rounded-lg p-6 shadow-lg mb-5">
                <h2 className="text-lg font-semibold mb-4 dark:text-dark">
                  Coupons
                </h2>
                <div className="couponContent flex items-center gap-4">
                  <div className="flex-grow">
                    <div className="relative mt-1">
                      <input
                        type="text"
                        className="block md:w-72 ipadMini:w-48 xl:w-96 surfaceDuo:w-48 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-dark sm:text-sm"
                        placeholder="Enter coupon code"
                      />
                      <ButtonComponent className="button absolute top-0 right-10 ipadPro:right-0 h-full px-4 py-2">
                        Apply
                      </ButtonComponent>
                    </div>
                  </div>
                </div>
              </div>
              <div className="priceDetails bg-white border rounded-lg p-6 shadow-lg dark:text-dark">
                <h2 className="text-lg font-semibold mb-4">Price Details</h2>
                <div className="priceContent flex justify-between">
                  <div className="title">Total price</div>
                  <div className="price">€{totalPrice.toFixed(2)}</div>
                </div>
                <div className="priceContent flex justify-between">
                  <div className="title">Shiping cost</div>
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
          <div className="noCartItems text-center  flex flex-col">
            <p className="text-gray-600 text-lg mb-5">No Items Here </p>
            <ButtonComponent to="/catalog" children="Shop Now" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
