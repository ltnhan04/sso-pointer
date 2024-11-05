"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./api/auth/auth";
import HeaderComponent from "@/components/common/headerComponent";
import Sidebar from "@/components/common/sidebar";
import Image from "next/image";
import AvatarDefault from '../../public/images/avatardefault.png'
export default function Home() {
  const {data,isLoading} = useQuery({
    queryKey: ['get-email-user'],
    queryFn: async () => {
      const response = await getProfile()
      return response.data
    }
  })
  if (isLoading) return 'Loading...'
   return (
    <>
    <div className="w-full h-screen overflow-auto ">
      <HeaderComponent title="Home" />
      <Sidebar />
      <div className="mt-[125px] max-w-[1000px] lg:mt-[100px] lg:ml-[320px] mx-auto ">
        <div className="flex items-center justify-center space-x-[20px] pt-3 font-medium text-2xl">
          <Image src={AvatarDefault} alt="Avatar" width={60} height={60} className="rounded-full"/>
          <p>Xin chào {data.email} </p>
        </div>
        <p className="text-center text-3xl mt-3 text-gray-400">Chào mừng bạn đến với application app</p>
      </div>
    </div>
    </>
    
  );
}
