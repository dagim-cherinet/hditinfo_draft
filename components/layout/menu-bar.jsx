// components/layout/menu-bar.jsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Home, UserCircle } from "lucide-react";
import Image from "next/image";
import { useBankContext } from "@/app/context/bank-context";

export default function MenuBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { resetSelection } = useBankContext();

  // Mark as mounted after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Handle home click
  const handleHomeClick = () => {
    resetSelection();
  };

  return (
    <header className="h-16 border-b flex items-center justify-between px-4 bg-background">
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="mr-2"
            priority // Ensure logo loads with priority
          />
          <h1 className="text-lg font-medium truncate max-w-[500px] hidden sm:block">
            Hawassa District Branch Information Repository
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Home button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleHomeClick}
          title="Home"
        >
          <Home className="h-8 w-8" />
          <span className="sr-only">Home</span>
        </Button>

        {/* Theme toggle - uses current theme if mounted */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          title={
            mounted
              ? theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
              : "Theme toggle"
          }
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="h-8 w-8" />
            ) : (
              <Moon className="h-8 w-8" />
            )
          ) : (
            <div className="h-8 w-8 rounded-full bg-current opacity-50" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* User profile */}
        <Button variant="ghost" size="icon" title="User profile">
          <UserCircle className="h-8 w-8" />
          <span className="sr-only">User profile</span>
        </Button>
      </div>
    </header>
  );
}
