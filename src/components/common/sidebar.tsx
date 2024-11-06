"use client";

import {
  History,
  House,
  Info,
  LayoutGrid,
  LucideIcon,
  User,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SideBarItemsProps = {
  name: string;
  icon: LucideIcon;
  color: string;
  path: string;
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 430);
    }
  }, []);

  const SidebarItems: SideBarItemsProps[] = [
    {
      name: "Home",
      icon: House,
      color: "#374151",
      path: "/home",
    },
    {
      name: "Application",
      icon: LayoutGrid,
      color: "#374151",
      path: "/application",
    },
    {
      name: "OAuth App",
      icon: User,
      color: "#374151",
      path: "/oauth-app",
    },
    {
      name: "Personal Information",
      icon: Info,
      color: "#374151",
      path: "/personal-information",
    },
    {
      name: "History Login",
      icon: History,
      color: "#374151",
      path: "/history-login",
    },
  ];

  return (
    <div className="fixed z-10 flex text-lg overflow-x-auto left-0 overflow-hidden right-0 mt-[82px] space-x-[30px] justify-center lg:flex lg:flex-col lg:space-x-0 lg:space-y-[20px] lg:w-[300px] lg:px-4  lg:text-gray-700 lg:mt-[100px]">
      {SidebarItems.map((items, index) => (
        <Link key={index} href={items.path}>
          <div
            className={`flex items-start lg:items-center py-2 px-2 text-sm lg:text-md rounded-lg font-medium lg:hover:bg-gray-300 lg:rounded-lg lg:py-3 ${
              pathname === items.path ? "bg-blue-300 text-gray-700" : ""
            }`}
          >
            <items.icon
              color={items.color}
              className="hidden lg:block lg:mx-2"
            />
            <span className={`text-center ${isMobile ? "w-full" : ""}`}>
              {items.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
