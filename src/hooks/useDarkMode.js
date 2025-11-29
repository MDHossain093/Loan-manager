import { useEffect, useState } from "react";

export function useDarkMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("loan_dark_mode");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved === "true" || (saved === null && prefers);
    setEnabled(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("loan_dark_mode", String(next));
      return next;
    });
  };

  return { enabled, toggle };
}
