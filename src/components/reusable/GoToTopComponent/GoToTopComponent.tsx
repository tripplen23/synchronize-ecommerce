import React, { useState, useEffect } from "react";
import { BiSolidArrowToTop } from "react-icons/bi";

const GoToTopComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100); // Show button after scrolling 100px
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`fixed bottom-10 right-10 z-50 bg-dark hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-primary text-white px-3 py-2 rounded-full opacity-0 transition-all duration-300 ${
        isVisible ? "opacity-100" : ""
      }`}
      onClick={onTop}
    >
      <BiSolidArrowToTop />
    </button>
  );
};

export default GoToTopComponent;
