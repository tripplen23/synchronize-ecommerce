import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

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
      <Link
        to={to}
        className={`${styles.button} ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
