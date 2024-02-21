import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const Layout = () => {
  const [showModal, setShow] = useState(false);

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
    <div>
      <div className=" bg-light w-full min-h-screen dark:bg-dark">
        <Header handleShow={handleShow} />
        <main className="dark:text-light light:text-dark">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
