import { NavLink, useNavigate } from "react-router-dom";

export const CustomLink = ({
  to,
  title,
  className = "",
}: {
  to: string;
  title: string;
  className: string;
}) => {
  return (
    <NavLink to={to} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block w-0 bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 dark:bg-light `}
      >
        &nbsp;
      </span>
    </NavLink>
  );
};

export const CustomButtonLink = ({
  to,
  title,
  className = "",
  toggle,
}: {
  to: string;
  title: string;
  className: string;
  toggle: any;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    toggle();
    navigate(to);
  };

  return (
    <button
      className={`${className} relative group text-light dark:text-dark my-2`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`h-[1px] inline-block w-0 bg-light absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 dark:bg-dark `}
      >
        &nbsp;
      </span>
    </button>
  );
};