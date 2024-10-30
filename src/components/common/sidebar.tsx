"use client";

import {
  History,
  House,
  LucideIcon,
  // LayoutGrid,
  // MenuIcon,
  // User,
  UserPen,
} from "lucide-react";
import React from "react";
// import Image from "next/image";
// import LogoPressPay from "../../../public/images/Logo.png";
// import LogoPointer from "../../../public/images/pointer.png";
// import { AnimatePresence, motion } from "framer-motion";
// import ApplicationAppPage from "@/app/(apps)/home/page";
// import PersonalInformationPage from "@/app/(apps)/personal-information/page";
// import HistoryLoginPage from "@/app/(apps)/history-login/page";
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
  const SidebarItems: SideBarItemsProps[] = [
    {
      name: "Home",
      icon: House,
      color: "#374151",
      path: "/home",
    },
    {
      name: "Personal Information",
      icon: UserPen,
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
    <>
      <div className="fixed flex text-lg left-0 overflow-hidden right-0 mt-[82px] space-x-[30px] justify-center lg:flex lg:flex-col lg:space-x-0 lg:space-y-[20px] lg:w-[300px] lg:px-4  lg:text-gray-700 lg:mt-[100px]">
        {SidebarItems.map((items, index) => (
          <Link key={index} href={items.path}>
            <div
              className={`flex items-center py-2 px-2 text-sm lg:text-md rounded-lg font-medium lg:hover:bg-gray-300 lg:rounded-lg lg:py-3 ${
                pathname === items.path ? "bg-blue-300 text-gray-700" : ""
              }`}
            >
              <items.icon
                color={items.color}
                className="hidden lg:block lg:mx-2"
              />
              <span>{items.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
