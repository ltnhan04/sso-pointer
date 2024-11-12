"use client";
import { getAuthorizedApps } from "@/app/api/app/app";
import HeaderComponent from "@/components/common/headerComponent";
import Sidebar from "@/components/common/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Image from "next/image";
interface App {
  app: {
    _id: string;
    applicationName: string;
    applicationDescription: string;
    callBackUrl: string;
    image: string;
  };
}
export default function Application() {
  const { data, isLoading } = useQuery({
    queryKey: ["apps-authorized"],
    queryFn: async () => {
      const res = await getAuthorizedApps(getCookie("accessToken") || " ");
      return res.data;
    },
  });
  if (isLoading) {
    return "..Loading";
  }
  return (
    <>
      <div className="w-full h-screen overflow-auto">
        <HeaderComponent title="Application App" />
        <Sidebar />
        <div className="mt-[125px] max-w-[1000px] lg:mt-[100px] lg:ml-[320px] mx-auto ">
          <p className="text-black">
            You have granted <b>1 applications</b> access to your account
          </p>
          {data?.map((item: App, index: number) => (
            <div
              key={index}
              className="grid grid-cols-[60px_1fr_80px] border-b py-4"
            >
              <Image src={item.app.image} alt="Logo" width={50} height={50} />
              <div>
                <p className="text-lg text-blue-500">
                  {item.app.applicationName}
                </p>
                <p className="text-sm text-gray-400">
                  Last used within last week. Owned by{" "}
                  <u className="text-blue-500">{item.app.applicationName}</u>
                </p>
              </div>
              <button className="text-sm bg-gray-100 border-gray-400 font-medium border-[1px] h-fit text-red-500 rounded-[6px] w-[80px] text-center px-[12px] py-[3px] hover:bg-red-500 hover:text-white hover:border-red-500 hover:transition-colors hover:duration-300 active:opacity-60 active:transform-colors active:duration-300">
                Revoke
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
