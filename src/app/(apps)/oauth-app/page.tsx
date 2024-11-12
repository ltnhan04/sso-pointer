"use client";

import HeaderComponent from "@/components/common/headerComponent";
import Sidebar from "@/components/common/sidebar";
import Image from "next/image";
import logo from "../../../../public/images/pointer.png";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOAuthApp } from "@/app/api/auth/auth";
import nookies from "nookies";
interface OAuthAppItem {
  readonly _id: string;
  applicationName: string;
  image?: string;
}

export default function OAuthApp() {
  const cookies = nookies.get();
  const accessToken = cookies.accessToken || "";
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-oauth-app"],
    queryFn: async () => {
      const response = await getOAuthApp(accessToken);
      return response.data;
    },
  });
  if (isLoading) return "Loading...";
  if (isError) return "Error";
  console.log(data);
  if (!data || !Array.isArray(data)) {
    return <p>No data availble</p>;
  }
  const handleClickNews = () => {
    router.push("oauth-app/news");
  };
  const handleEdit = (_id: string) => {
    router.push(`/oauth-app/edit/${_id}`);
  };
  return (
    <>
      <div className="w-full h-screen overflow-auto">
        <HeaderComponent title="OAuth App" />
        <Sidebar />
        <div className="mt-[125px] max-w-[1000px] lg:mt-[100px] lg:ml-[320px] mx-auto ">
          <div className="flex justify-between border-b py-4">
            <p className="text-lg font-medium text-black">Create Oauth App</p>
            <div>
              <button
                onClick={handleClickNews}
                className="text-sm font-medium bg-gray-200 text-black border-gray-400 border-[1px] rounded-[6px] w-[125px] px-[12px] py-[3px]"
              >
                New Oauth App
              </button>
            </div>
          </div>
          {data.map((item: OAuthAppItem, index: number) => (
            <div
              key={index}
              className="grid grid-cols-[60px_1fr_80px] border-[1px] px-4 py-4 mt-4 rounded-[6px]"
            >
              <Image
                src={item.image ? item.image : logo}
                alt="Logo"
                width={50}
                height={50}
              />
              <div>
                <p className="text-lg text-blue-500">{item.applicationName}</p>
                <p className="text-sm text-gray-400">
                  Last used within last week. Owned by{" "}
                  <u className="text-blue-500">{item.applicationName}</u>
                </p>
              </div>
              <button
                onClick={() => handleEdit(item._id)}
                className="text-sm font-medium h-fit text-black bg-gray-200 border-gray-400 border-[1px] rounded-lg w-[80px] text-center px-[12px] py-[3px] hover:bg-gray-500 hover:text-white hover:transition-colors hover:duration-300 active:opacity-60 active:transform-colors active:duration-300"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
