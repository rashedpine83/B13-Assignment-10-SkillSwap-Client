"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "@gravity-ui/icons";
import { Switch } from "@heroui/react";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme") || "light";

    setTheme(savedTheme);

    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Switch isSelected={theme === "dark"} onChange={toggleTheme}>
      {({ isSelected }) => (
        <Switch.Control
          className={`h-[31px] w-[51px] ${
            isSelected ? "bg-cyan-500" : "bg-blue-500"
          }`}
        >
          <Switch.Thumb
            className={`size-[27px] bg-white ${isSelected ? "ms-[22px]" : ""}`}
          >
            <Switch.Icon>
              {isSelected ? (
                <Sun className="size-4 text-cyan-600" />
              ) : (
                <Moon className="size-4 text-blue-600" />
              )}
            </Switch.Icon>
          </Switch.Thumb>
        </Switch.Control>
      )}
    </Switch>
  );
};

export default ThemeSwitch;
