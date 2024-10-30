import React from "react";
import Sidebar from "@/components/ui/sidebar";
import HeaderComponent from "../../../../components/headerComponent";
// import { FaYoutube } from "react-icons/fa";
// import { FaFacebookSquare } from "react-icons/fa";
// import LogoWallet from '../../../../public/images/pointer.png'
// import Image from 'next/image';
export default function HomePage() {
  return (
    <div className="w-full h-screen overflow-auto ">
      <HeaderComponent title="Home" />
      <Sidebar />
      <div className="mt-[125px] max-w-[1300px] lg:mt-[100px] lg:ml-[320px] mx-auto p-8">
        <div className="">
          <p>Xin chào Nam Sang</p>
        </div>
      </div>
    </div>
  );
}
