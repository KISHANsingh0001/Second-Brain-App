// import { SunIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import MoonIcon from "../icon/MoonIcon";

// export default function DarkModeToggle() {
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     // Check localStorage for the user's preference
//     return localStorage.getItem("theme") === "dark";
//   });

//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (isDarkMode) {
//       root.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       root.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [isDarkMode]);

//   return (
//     <div
//       onClick={() => setIsDarkMode(!isDarkMode)}
//       className="p-1 rounded-2xl bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 cursor-pointer "
//     >
//       {isDarkMode ? <SunIcon /> : <MoonIcon/>}
//     </div>
//   );
// }

import { Moon, SunIcon } from "lucide-react";
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

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={handleToggle}
      className="w-full h-full rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer transition-all duration-200 flex items-center justify-center"
      type="button"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? (
        <SunIcon className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9" />
      ) : (
       <Moon className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9" />
      )}
    </button>
  );
}