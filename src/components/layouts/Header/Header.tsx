import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import LogoComponent from "../../reusable/LogoComponent/LogoComponent";
import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "../../reusable/IconComponent/IconComponent";
import useThemeSwitcher from "../../../hooks/useThemeSwitcher";
import { IoMdLogIn } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router";

import { SiSuperuser } from "react-icons/si";
import CartIcon from "./CartIcon/CartIcon";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import { logout } from "../../../redux/features/auth/authSlice";

interface HeaderProps {
  handleShow: () => void;
}

const CustomLink = ({
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

const Header: React.FC<HeaderProps> = ({ handleShow }) => {
  // TODO: Switch theme mode
  const [mode, setMode] = useThemeSwitcher();

  // TODO: Authentication
  const { user, token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user details are present in local storage
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      setIsAuthenticated(true);
    }
  }, [user, token]);

  const logoutHandler = async () => {
    await dispatch(logout());
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="font-kaushan w-full px-32 py-8 font-medium flex item-center justify-between dark:text-light">
      {/* link */}
      <nav>
        <CustomLink to="/catalog" title="All" className="mr-4" />
        <CustomLink to="/catalog/Men" title="Men" className="mx-4" />
        <CustomLink to="/catalog/Women" title="Women" className="mx-4" />
        <CustomLink
          to="/catalog/Electronics"
          title="Electronics"
          className="mx-4"
        />
        <CustomLink to="/catalog/Jewelery" title="Jewelery" className="ml-4" />
      </nav>

      {/* LOGO */}
      <nav>
        <div className="absolute left-[50%] top-2 translate-x-[-50%]">
          <LogoComponent />
        </div>
      </nav>

      {/* Features */}
      <nav className="flex items-center justify-center flex-wrap mr-10">
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 mx-3"
        >
          <CartIcon />
        </motion.div>
        {/* If user is in the local storage, logout will be shown otherwise login and User*/}
        {isAuthenticated === true ? (
          <div className="flex">
            <motion.a
              href="/admin"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3"
            >
              <SiSuperuser />
            </motion.a>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3"
              onClick={() => logoutHandler()}
            >
              <MdLogout />
            </motion.button>
          </div>
        ) : (
          <div className="flex">
            {" "}
            <motion.a
              href="/login"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3"
            >
              <IoMdLogIn />
            </motion.a>
          </div>
        )}

        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={`ml-3 flex items-center justify-center rounded-full p-1 ${
            mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
          }`}
        >
          {mode === "dark" ? (
            <SunIcon className={"fill-dark"} />
          ) : (
            <MoonIcon className={"fill-dark"} />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;
