import React from "react";
import { useAppSelector } from "../../../redux/utils/hooks";
import ModalComponent from "../../../components/reusable/ModalComponents/ModalComponent";
import { useMediaQuery } from "react-responsive";
import { CartItemType } from "../../../misc/cartType";
import CartProduct from "../CartProduct/CartProduct";
import ButtonComponent from "../../../components/reusable/ButtonComponent/ButtonComponent";
import { motion } from "framer-motion";

interface CartModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal: React.FC<CartModalProps> = ({ show, setShow }) => {
  const { cartItems } = useAppSelector((state) => state.cart);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <ModalComponent isOpen={show} onClose={handleClose} isRight={isBigScreen}>
      <motion.div
        className="container rounded-lg overflow-hidden shadow-xl bg-white w-92"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="p-6 ">
          <h3 className="text-xl font-semibold mb-4 flex flex-col items-center">
            Your Cart
          </h3>
          {cartItems.map((item: CartItemType) => (
            <CartProduct
              key={item.product.id}
              item={item}
              onClick={handleClose}
            />
          ))}
          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">€{totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex mt-2 justify-between">
            <ButtonComponent className="mr-4" to="/cart" onClick={handleClose}>
              Your Cart
            </ButtonComponent>
            <ButtonComponent to="/cart" onClick={handleClose}>
              Check out
            </ButtonComponent>
          </div>
          <div className="mt-4">
            <ButtonComponent className="w-full" onClick={handleClose}>
              Go back
            </ButtonComponent>
          </div>
        </div>
      </motion.div>
    </ModalComponent>
  );
};

export default CartModal;
