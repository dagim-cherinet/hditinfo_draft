// app/page.js
"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/sidebar";
import MenuBar from "@/components/layout/menu-bar";
import ContentArea from "@/components/layout/content-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Home() {
  // Track if the component has hydrated
  const [hydrated, setHydrated] = useState(false);

  // Set hydrated to true after initial render
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Static placeholder for menu bar - shown before hydration */}
      {!hydrated && (
        <div className="h-16 border-b flex items-center justify-between px-4 bg-background">
          <div className="flex items-center space-x-4">
            {/* Logo placeholder */}
            <div className="w-10 h-10 bg-primary rounded-md"></div>
            {/* Title placeholder */}
            <div className="w-64 h-6 bg-muted rounded hidden sm:block"></div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Button placeholders */}
            <div className="w-9 h-9 rounded-md bg-muted"></div>
            <div className="w-9 h-9 rounded-md bg-muted"></div>
            <div className="w-9 h-9 rounded-md bg-muted"></div>
          </div>
        </div>
      )}

      {/* Real menu bar - only shown after hydration */}
      {hydrated && <MenuBar />}

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Navigation */}
        <div className="lg:hidden fixed top-20 left-4 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[300px]">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block w-64 h-full border-r">
          <Sidebar />
        </div>

        {/* Main Content */}
        <ContentArea />
      </div>
    </div>
  );
}
