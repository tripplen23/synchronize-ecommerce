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
    <footer className="w-full border-t-2 border-solid border-dark font-medium text-lg dark:text-light ">
      <div className="layout w-full h-full inline-block z-0 bg-light p-20 dark:bg-dark">
        <div className="flex items-center justify-between">
          <span>
            Synchronize {new Date().getFullYear()} &copy; All Rights Reserved.
          </span>
          <div className="flex flex-col">
            <div className="flex items-center">
              Build With{" "}
              <span className="text-primary text-2xl px-1">&#9825;</span>{" "}
              by&nbsp;
              <Link to="/" className="underline underline-offset-2">
                BinhNguyen
              </Link>
            </div>
            <div className="socials flex items-center justify-between">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer">
                <FaTiktok />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitterSquare />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <FaYoutube />
              </a>
            </div>
          </div>
          <Link
            to=""
            target={"_blank"}
            className="underline underline-offset-2"
          >
            Say hello
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
