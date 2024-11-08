"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  authorizeAPI,
  getAuthorizeAppAPI,
  getProfile,
} from "@/app/api/auth/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
interface App {
  _id: string;
  applicationName: string;
  applicationDescription: string;
  callBackUrl: string;
  image: string;
}
const Index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId") || " ";
  const [callBackUrl, setCallBackUrl] = useState<string>();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const token = getCookie("accessToken") || " ";
      const res = await authorizeAPI(token, clientId);
      return res.data;
    },
    onSuccess(data) {
      console.log(data);
      location.replace(`${callBackUrl}?code=${data.code}`);
    },
  });
  const { data: dataR, isError: isErrorR } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = getCookie("accessToken") || " ";
      if (token === " ") {
        router.push(`/login?clientId=${clientId}`);
      }
      const res = await getProfile(token);
      return res.data;
    },
  });
  if (isErrorR) {
    console.log("isErrorR");
    router.push(`/login?clientId=${clientId}`);
  }
  const { data, isLoading, isError } = useQuery<App>({
    queryKey: ["authorize"],
    queryFn: async () => {
      const rs = await getAuthorizeAppAPI(clientId);
      setCallBackUrl(rs.data.callBackUrl);
      return rs.data;
    },
    retry: 0,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return "App Not Found";
  }

  function handleAccept(): void {
    mutate();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* <h1 className="text-center">In progress</h1> */}
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <Image
            className="w-12 h-12"
            width={48}
            height={48}
            quality={100}
            src={data?.image ? data.image : "https://i.imgur.com/5cYzRrm.png"}
            alt="logo"
          />
          <h1 className="text-2xl font-bold text-gray-700 ml-4">
            Đăng nhập bằng Pointer
          </h1>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {dataR?.email}
          </h2>
          <h3 className="text-xl mt-4 font-semibold text-gray-700">
            Bạn đang đăng nhập vào{" "}
            <span className="text-[#0D99FF]">{data?.applicationName}</span>
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Nếu bạn tiếp tục, Pointer sẽ chia sẻ tên, địa chỉ email, lựa chọn ưu
            tiên về ngôn ngữ và ảnh hồ sơ của bạn với{" "}
            {
              <span className="text-[#0D99FF] font-semibold">
                {data?.applicationName}
              </span>
            }
            . Hãy xem Chính sách quyền riêng tư và Điều khoản dịch vụ của{" "}
            {
              <span className="text-[#0D99FF] font-semibold">
                {data?.applicationName}
              </span>
            }
            . Bạn có thể quản lý tính năng Đăng nhập bằng Pointer trong Tài
            khoản Pointer của mình.
          </p>
        </div>

        <div className="flex justify-between mt-8">
          <Button className="w-full mr-2 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-200">
            Hủy
          </Button>
          <Button
            onClick={handleAccept}
            className="w-full ml-2 py-3 bg-[#0D99FF] text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
