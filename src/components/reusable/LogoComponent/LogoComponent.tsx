import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const LogoComponent = () => {
  return (
    <div className="flex items-center justify-center mt-2">
      <MotionLink
        to="/"
        className="w-16 h-16 bg-dark text-light flex items-center justify-center rounded-full text-2xl font-bold border border-solid border-transparent dark:border-light"
        whileHover={{
          backgroundColor: [
            "#121212",
            "#11ad99",
            "#fe8787",
            "#ffcf8c",
            "#58E6D9",
            "#121212",
          ],
          transition: { duration: 1, repeat: Infinity },
        }}
      >
        S
      </MotionLink>
    </div>
  );
};

export default LogoComponent;
