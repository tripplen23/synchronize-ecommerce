import React, { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { useAppSelector } from "../../../../redux/utils/hooks";
interface CartIconProps {
  handleShow: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ handleShow }) => {
  const { totalItems, status } = useAppSelector((state) => state.cart);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setBump(true);
      const timer = setTimeout(() => {
        setBump(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <div
      className={`relative ${bump ? "animate-bump" : ""}`}
      onClick={handleShow}
    >
      <FaOpencart />
      {totalItems > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center">
          {totalItems}
        </div>
      )}
    </div>
  );
};

export default CartIcon;
