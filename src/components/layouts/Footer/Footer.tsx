import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitterSquare,
  FaTiktok,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-solid border-dark dark:border-light font-medium text-lg dark:text-light">
      <div className="layout w-full h-full inline-block z-0 bg-light p-20 dark:bg-dark">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <span className="text-center lg:text-left text-gray-600 dark:text-gray-400">
            Synchronize {new Date().getFullYear()} &copy; All Rights Reserved.
          </span>
          <div className="flex flex-col items-center lg:items-start smPhone:mt-10">
            <div className="flex items-center mb-4 lg:mb-0 smPhone:hidden">
              Build With{" "}
              <span className="text-primary text-2xl px-1 ">&#9825;</span>{" "}
              by&nbsp;
              <a
                href="https://github.com/tripplen23"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-primary transition-colors"
              >
                BinhNguyen
              </a>
            </div>
            <div className="socials flex items-center space-x-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors transform hover:scale-110"
              >
                <FaInstagram />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors transform hover:scale-110"
              >
                <FaTiktok />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors transform hover:scale-110"
              >
                <FaTwitterSquare />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors transform hover:scale-110"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors transform hover:scale-110"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
          <div className="help-links ipadPro:hidden">
            <ul className="nav flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary transition-colors transform hover:scale-105"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-primary transition-colors transform hover:scale-105"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-primary transition-colors transform hover:scale-105"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-primary transition-colors transform hover:scale-105"
                >
                  Track My Order
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-primary transition-colors transform hover:scale-105"
                >
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
