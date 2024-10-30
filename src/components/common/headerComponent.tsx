import { LayoutGrid } from "lucide-react";
import React from "react";
import AvatarDefault from "/images/avatardefault.png";
import LogoPointer from "/images/pointer.png";
import Image from "next/image";

export default function HeaderComponent({ title }: { title: string }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full bg-white flex justify-between items-center p-4">
        <div id="Logo">
          <Image src={LogoPointer} alt="Logo" width={50} height={50} />
        </div>
        <div id="Title" className="text-xl lg:text-3xl font-bold text-gray-500">
          {title}
        </div>
        <div id="Content" className="flex items-center shrink-0 space-x-[20px]">
          <div>
            <LayoutGrid className="size-[30px] text-gray-500" />
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
