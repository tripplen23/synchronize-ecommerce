import React from "react";
import { Link } from "react-router-dom";

interface ButtonComponentProps {
  children: React.ReactNode;
  className?: string;
  to?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  className,
  to,
  type,
  onClick,
  disabled,
}) => {
  const baseStyles =
    "transition duration-300 ease-in-out transform hover:scale-105";

  if (to) {
    return (
      <Link
        to={to}
        className={`dark:bg-gray-800 bg-dark text-light font-semibold px-4 py-2 rounded-full ${baseStyles} ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`dark:bg-gray-800 bg-dark text-white font-semibold px-4 py-2 rounded-full ${baseStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
