'use client'
import {LayoutGrid } from "lucide-react";
import React, { useState } from "react";
const AvatarDefault = "/images/avatardefault.png";
const LogoPointer = "/images/pointer.png";
import Image from "next/image"; 
import MenuApp from "../ui/menu-app";

export default function HeaderComponent({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <div className="fixed z-20 top-0 left-0 right-0 w-full bg-white flex justify-between items-center p-4">
        <div id="Logo">
          <Image src={LogoPointer} alt="Logo" width={50} height={50} />
        </div>
        <div id="Title" className="text-xl lg:text-3xl font-bold text-gray-500">
          {title}
        </div>
        <div id="Content" className="flex items-center shrink-0 space-x-[20px]">
          <div className=" relative ">
            <LayoutGrid className="size-[30px] text-gray-500 cursor-pointer" onClick={handleToggle} />
            {isOpen && (
              <div className="z-[1000]">
                <MenuApp/>
              </div>
            )}
          </div>
          <div className="mr-[20px] w-[40px] h-[40px] ">
            <Image
              src={AvatarDefault}
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
