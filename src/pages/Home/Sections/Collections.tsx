import React from "react";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import { collectionImages } from "../../../data/images";
import { motion } from "framer-motion";

const Collections = () => {
  return (
    <section className="section py-12 dark:bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">
          Explore Our Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionImages.map((item, id) => (
            <motion.div
              key={id}
              className="relative overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05, zIndex: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <img
                src={item.path}
                alt={item.name}
                className="object-cover w-full h-60 md:h-72 lg:h-80"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100 dark:bg-opacity-70">
                <Link
                  to={item.link}
                  className="text-white text-2xl font-semibold flex items-center space-x-2"
                >
                  <span>{item.name}</span>
                  <MdArrowForward />
                </Link>
              </div>
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1 rounded-full text-white text-sm font-semibold">
                New Collection
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
