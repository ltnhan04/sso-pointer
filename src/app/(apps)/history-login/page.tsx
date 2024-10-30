import Sidebar from "@/components/ui/sidebar";
import React from "react";
import HeaderComponent from "../../../../components/headerComponent";
import { FaLaptopCode } from "react-icons/fa";
import { BsPhone } from "react-icons/bs";
import { GrNext } from "react-icons/gr";
import { FaCheckCircle } from "react-icons/fa";
export default function HistoryLoginPage() {
  return (
    <div className="w-full h-screen overflow-auto">
      <HeaderComponent title="History Login" />
      <Sidebar />
      <div className="mt-[125px] max-w-7xl lg:mt-[100px] lg:ml-[320px] mx-auto p-8 ">
        <div id="Content" className="border">
          <div className="grid grid-cols-[50px_200px_1fr] space-x-[30px] w-[1200px] py-6 px-3">
            <p>
              <FaLaptopCode className="text-5xl" />
            </p>
            <p>3 phiên bản hoạt động trên window</p>
            <div className="space-y-[20px]">
              <div className="flex items-center space-x-[20px] pb-3 border-b-[1px]">
                <div className="space-y-[10px] w-1/2 ">
                  <p className="font-bold">Window</p>
                  <p className="text-gray-900">Hồ Chí Minh, Việt Nam</p>
                  <p className="text-gray-900">Google</p>
                  <p className="text-gray-900  flex items-center">
                    <FaCheckCircle className="text-blue-500 text-xl mr-3" />
                    Phiên bản hoạt động của bạn
                  </p>
                </div>
                <div className="w-1/2 flex justify-end">
                  <GrNext />
                </div>
              </div>
              <div className="flex items-center space-x-[20px] pb-3 border-b-[1px]">
                <div className="space-y-[10px] w-1/2 ">
                  <p className="font-bold">Window</p>
                  <p className="text-gray-900">Hồ Chí Minh, Việt Nam</p>
                  <p className="text-gray-900">Google</p>
                  <p className="text-gray-900  flex items-center">
                    <FaCheckCircle className="text-blue-500 text-xl mr-3" />
                    Phiên bản hoạt động của bạn
                  </p>
                </div>
                <div className="w-1/2 flex justify-end">
                  <GrNext />
                </div>
              </div>
              <div className="flex items-center space-x-[20px] pb-3 border-b-[1px]">
                <div className="space-y-[10px] w-1/2  ">
                  <p className="font-bold">Window</p>
                  <p className="text-gray-900">Hồ Chí Minh, Việt Nam</p>
                  <p className="text-gray-900">Google</p>
                  <p className="text-gray-900 flex items-center">
                    <FaCheckCircle className="text-blue-500 text-xl mr-3" />
                    Phiên bản hoạt động của bạn
                  </p>
                </div>
                <div className="w-1/2 flex justify-end">
                  <GrNext />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="Content" className="mt-[40px] border">
          <div className="grid grid-cols-[50px_200px_1fr] space-x-[30px] w-[1200px] py-6 px-3 ">
            <p>
              <BsPhone className="text-5xl" />
            </p>
            <p>3 phiên bản hoạt động trên window</p>
            <div className="space-y-[20px]">
              <div className="flex items-center space-x-[20px] pb-3 border-b-[1px] hover:bg-gray-200 px-3 py-3">
                <div className="space-y-[10px] w-1/2 ">
                  <p className="font-bold">Window</p>
                  <p className="text-gray-900">Hồ Chí Minh, Việt Nam</p>
                  <p className="text-gray-900">Google</p>
                  <p className="text-gray-900  flex items-center">
                    <FaCheckCircle className="text-blue-500 text-xl mr-3" />
                    Phiên bản hoạt động của bạn
                  </p>
                </div>
                <div className="w-1/2 flex justify-end">
                  <GrNext />
                </div>
              </div>
              <div className="flex items-center space-x-[20px] pb-3 border-b-[1px]">
                <div className="space-y-[10px] w-1/2 ">
                  <p className="font-bold">Window</p>
                  <p className="text-gray-900">Hồ Chí Minh, Việt Nam</p>
                  <p className="text-gray-900">Google</p>
                  <p className="text-gray-900  flex items-center">
                    <FaCheckCircle className="text-blue-500 text-xl mr-3" />
                    Phiên bản hoạt động của bạn
                  </p>
                </div>
                <div className="w-1/2 flex justify-end">
                  <GrNext />
                </div>
              </div>
              <div className="flex items-center space-x-[20px]  pb-3 border-b-[1px]">
                <div className="space-y-[10px] w-1/2  ">
                  <p className="font-bold">Window</p>
                  <p className="text-gray-900">Hồ Chí Minh, Việt Nam</p>
                  <p className="text-gray-900">Google</p>
                  <p className="text-gray-900 flex items-center">
                    <FaCheckCircle className="text-blue-500 text-xl mr-3" />
                    Phiên bản hoạt động của bạn
                  </p>
                </div>
                <div className="w-1/2 flex justify-end">
                  <GrNext />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
