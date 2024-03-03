import React, { useEffect } from "react";
import { useAppSelector } from "../../../redux/utils/hooks";
import ModalComponent from "../../../components/reusable/ModalComponents/ModalComponent";
import { useMediaQuery } from "react-responsive";
import { CartItemType } from "../../../misc/cartType";
import CartProduct from "../CartProduct/CartProduct";
import ButtonComponent from "../../../components/reusable/ButtonComponent/ButtonComponent";

interface CartModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal: React.FC<CartModalProps> = ({ show, setShow }) => {
  const { cartItems } = useAppSelector((state) => state.cart);

  console.log("CartModal is rendering with show value:", show);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  const isBigScreen = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const handleClose = () => {
    setShow(false);
  };

  return (
    <ModalComponent isOpen={show} onClose={handleClose} isRight={isBigScreen}>
      <div className="container">
        <div className="content">
          {cartItems.map((item: CartItemType) => (
            <CartProduct
              key={item.product.id}
              item={item}
              onClick={handleClose}
            />
          ))}
        </div>
        <div className="footer_container">
          <div className="footer_wrapper">
            <div className="footer_total">
              <p>
                <span>Total</span>
              </p>
            </div>
            <div className="buttons_wrapper">
              <div className="buttons_container">
                <ButtonComponent
                  className="button cart_button"
                  to="/cart"
                  onClick={handleClose}
                >
                  Your cart
                </ButtonComponent>
                <ButtonComponent
                  className="button checkout_button"
                  to="/cart"
                  onClick={handleClose}
                >
                  Check out
                </ButtonComponent>
              </div>
              <ButtonComponent
                className="button close_button"
                onClick={handleClose}
              >
                Go back
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </ModalComponent>
  );
};

export default CartModal;
