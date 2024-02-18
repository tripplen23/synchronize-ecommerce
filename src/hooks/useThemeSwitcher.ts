import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

type ThemeMode = "light" | "dark";

const useThemeSwitcher = (): [
  ThemeMode,
  Dispatch<SetStateAction<ThemeMode>>
] => {
  const preferDarkQuery = "(prefer-color-scheme: dark)";
  const [mode, setMode] = useState<ThemeMode>(() => {
    const userPref = window.localStorage.getItem("theme");
    if (userPref) {
      return userPref as ThemeMode;
    } else {
      return window.matchMedia(preferDarkQuery).matches ? "dark" : "light";
    }
  });

  useEffect(() => {
    const handleChange = () => {
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    };

    handleChange();

    window.addEventListener("beforeunload", handleChange);

    return () => {
      window.removeEventListener("beforeunload", handleChange);
    };
  }, [mode]);

  useEffect(() => {
    window.localStorage.setItem("theme", mode);
  }, [mode]);

  return [mode, setMode];
};

export default useThemeSwitcher;
