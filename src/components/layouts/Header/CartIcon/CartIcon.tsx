import React from "react";
import { FaOpencart } from "react-icons/fa";

interface CartIconProps {
  handleShow: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ handleShow }) => {
  return (
    <div onClick={handleShow}>
      <FaOpencart />
    </div>
  );
};

export default CartIcon;
