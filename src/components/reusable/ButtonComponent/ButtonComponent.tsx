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
  if (to) {
    return (
      <Link to={to} className={`${className}`} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
