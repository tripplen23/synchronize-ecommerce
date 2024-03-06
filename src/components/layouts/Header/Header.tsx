import { useEffect, useState } from "react";
import LogoComponent from "../../reusable/LogoComponent/LogoComponent";
import { motion, AnimatePresence } from "framer-motion";
import { MoonIcon, SunIcon } from "../../reusable/IconComponent/IconComponent";
import useThemeSwitcher from "../../../hooks/useThemeSwitcher";
import { IoMdLogIn } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router";

import { SiSuperuser } from "react-icons/si";
import CartIcon from "./CartIcon/CartIcon";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import { logout } from "../../../redux/features/auth/authSlice";
import {
  CustomButtonLink,
  CustomLink,
} from "../../reusable/CustomNavComponents/CustomNavComponents";

interface HeaderProps {
  handleShow: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleShow }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  // TODO: Switch theme mode
  const [mode, setMode] = useThemeSwitcher();

  // TODO: Authentication
  const { user, token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // TODO: Check if login token is present in local storage
  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");

    if (loginToken) {
      setIsAuthenticated(true);
    }
  }, [user, token]);

  const logoutHandler = async () => {
    await dispatch(logout());
    setIsAuthenticated(false);
    navigate("/");
  };

  //TODO: Scrolling effects
  const resizeHeaderOnScroll = () => {
    setHasScrolled(
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", resizeHeaderOnScroll);

    return () => window.removeEventListener("scroll", resizeHeaderOnScroll);
  }, []);

  // TODO: Burger menu clicking
  const handleClickBurger = () => {
    setIsOpenBurger(!isOpenBurger);
  };

  // TODO: Constants for styling
  const navStyles = `${
    hasScrolled
      ? " fixed top-0 left-0 w-full z-50 ipadPro:pb-12 bg-gray-700 bg-opacity-60 text-light"
      : ""
  } w-full px-32 py-8 font-medium flex item-center justify-between dark:text-light transition-all duration-300`;

  const logoStyles = `
  absolute left-[50%] translate-x-[-50%] top-2 ipadPro:top-1`;

  const iconsMenuStyles = `
  flex items-center justify-center flex-wrap ipadPro:mr-0 mr-10 mt-2`;

  const burgerStyles = `flex-col justify-center items-center xl:hidden flex absolute left-[10%] translate-x-[-50%] top-10 `;

  const laptopMenuStyles = `w-full justify-between items-center xlDevice:hidden lg:flex`;

  const iconStyles = `w-6 mx-3`;

  const otherDevicesMenuStyles = `min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/75 dark:bg-light/75 dark:text-dark text-light rounded-lg backdrop-blur-md py-32 xl:hidden`;

  return (
    <AnimatePresence>
      <motion.header
        key="header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className={navStyles}
      >
        {/* Burger menu */}
        <button className={burgerStyles} onClick={handleClickBurger}>
          <span
            className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${
              isOpenBurger ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          ></span>
          <span
            className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm my-0.5 ${
              isOpenBurger ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${
              isOpenBurger ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          ></span>
        </button>

        {/* Laptop Menu */}
        <div className={laptopMenuStyles}>
          {/* link */}
          <nav>
            <CustomLink to="/catalog/All" title="All" className="mr-4" />
            <CustomLink to="/catalog/Men" title="Men" className="mx-4" />
            <CustomLink to="/catalog/Women" title="Women" className="mx-4" />
            <CustomLink
              to="/catalog/Electronics"
              title="Electronics"
              className="mx-4"
            />
            <CustomLink
              to="/catalog/Jewelery"
              title="Jewelery"
              className="ml-4"
            />
          </nav>

          {/* Features */}
          <nav className={iconsMenuStyles}>
            {/* Cart */}
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className={iconStyles}
            >
              <CartIcon handleShow={handleShow} />
            </motion.div>
            {/* If user is in the local storage, logout will be shown otherwise login and User*/}
            {isAuthenticated === true ? (
              <div className="flex">
                <motion.a
                  href="/admin"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={iconStyles}
                >
                  <SiSuperuser />
                </motion.a>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={iconStyles}
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
                  className={iconStyles}
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
        </div>

        {isOpenBurger && (
          /* Other devices Menu */
          <motion.div
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1 }}
            className={otherDevicesMenuStyles}
          >
            {/* link */}
            <nav className="flex items-center flex-col justify-center">
              <button className={burgerStyles} onClick={handleClickBurger}>
                <span
                  className={`bg-light dark:bg-dark transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${
                    isOpenBurger
                      ? "rotate-45 translate-y-1"
                      : "-translate-y-0.5"
                  }`}
                ></span>
                <span
                  className={`bg-light dark:bg-dark transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm my-0.5 ${
                    isOpenBurger ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`bg-light dark:bg-dark transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${
                    isOpenBurger
                      ? "-rotate-45 -translate-y-1"
                      : "translate-y-0.5"
                  }`}
                ></span>
              </button>
              <CustomButtonLink
                to="/catalog/All"
                title="All"
                className=""
                toggle={handleClickBurger}
              />
              <CustomButtonLink
                to="/catalog/Men"
                title="Men"
                className=""
                toggle={handleClickBurger}
              />
              <CustomButtonLink
                to="/catalog/Women"
                title="Women"
                className=""
                toggle={handleClickBurger}
              />
              <CustomButtonLink
                to="/catalog/Electronics"
                title="Electronics"
                className=""
                toggle={handleClickBurger}
              />
              <CustomButtonLink
                to="/catalog/Jewelery"
                title="Jewelery"
                className=""
                toggle={handleClickBurger}
              />
            </nav>

            {/* Features */}
            <nav className={iconsMenuStyles}>
              {/* Cart */}
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-6 mx-3 sm:mx-1"
              >
                <CartIcon handleShow={handleShow} />
              </motion.div>
              {/* If user is in the local storage, logout will be shown otherwise login and User*/}
              {isAuthenticated === true ? (
                <div className="flex">
                  <motion.a
                    href="/admin"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-6 mx-3 sm:mx-1"
                  >
                    <SiSuperuser />
                  </motion.a>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-6 mx-3 sm:mx-1"
                    onClick={() => logoutHandler()}
                  >
                    <MdLogout />
                  </motion.button>
                </div>
              ) : (
                <div className="flex">
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
          </motion.div>
        )}

        {/* LOGO */}
        <nav>
          <div className={logoStyles}>
            <LogoComponent />
          </div>
        </nav>
      </motion.header>
    </AnimatePresence>
  );
};

export default Header;
