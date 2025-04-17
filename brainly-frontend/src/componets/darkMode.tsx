import { SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import MoonIcon from "../icon/MoonIcon";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for the user's preference
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-1 rounded-2xl bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    >
      {isDarkMode ? <SunIcon/> : <MoonIcon/>}
    </div>
  );
}