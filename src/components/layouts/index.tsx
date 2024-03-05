import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { AnimatePresence } from "framer-motion";
import CartModal from "../../pages/Cart/CartModal/CartModal";

const Layout = () => {
  const [showModal, setShow] = useState(false);

  // TODO: Show cart modal when user navigates to cart icon
  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = showModal ? "hidden" : "auto";
    }
  }, [showModal]);

  const handleShow = () => {
    setShow(true);
  };

  return (
    <div className="layout font-orbitron">
      <div className=" bg-light w-full min-h-screen dark:bg-dark">
        <Header handleShow={handleShow} />

        <main className="dark:text-light light:text-dark">
          <Outlet />
        </main>
        <Footer />
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <CartModal show={showModal} setShow={setShow} />}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
