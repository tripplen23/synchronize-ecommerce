import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const Layout = () => {
  return (
    <div>
      <div className="font-kaushan bg-light w-full min-h-screen dark:bg-dark">
        <Header
          handleShow={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <main className="dark:text-light light:text-dark">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
