'use client'
const AvatarDefault = "/images/avatardefault.png";
const LogoPointer = "/images/pointer.png";
import Image from "next/image"; 

export default function HeaderComponent({ title }: { title: string }) {

  return (
    <>
      <div className="fixed z-20 top-0 left-0 right-0 w-full bg-white flex justify-between items-center p-4 border-b-2">
        <div id="Logo">
          <Image src={LogoPointer} alt="Logo" width={50} height={50} />
        </div>
        <div id="Title" className="text-xl lg:text-3xl font-bold text-gray-900">
          {title}
        </div>
        <div id="Content" className="flex items-center shrink-0 space-x-[20px]">
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
