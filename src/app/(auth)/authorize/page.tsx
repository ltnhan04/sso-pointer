"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { authorizeAPI } from "@/app/api/auth/auth";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
const Index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || " ";
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["authorize"],
    queryFn: async () => {
      const token = getCookie("accessToken") || "";
      const rs = await authorizeAPI(token);
      return rs.data;
    },
    retry: 0,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isSuccess) {
    console.log(callbackUrl);
    window.location.replace(`${callbackUrl}?code=${data.code}`);
  }
  if (isError) {
    console.log(isError);
    router.push(`/login?callbackUrl=${callbackUrl}`);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <h1 className="text-center">In progress</h1>
      {/* <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <Image
            className="w-12 h-12"
            width={48}
            height={48}
            quality={100}
            src={"https://i.imgur.com/5cYzRrm.png"}
            alt="logo"
          />
          <h1 className="text-2xl font-bold text-gray-700 ml-4">
            Đăng nhập bằng Pointer
          </h1>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">{data.email}</h2>
          <h3 className="text-xl mt-4 font-semibold text-gray-700">
            Bạn đang đăng nhập vào{" "}
            <span className="text-[#0D99FF]">{dataR.applicationName}</span>
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Nếu bạn tiếp tục, Pointer sẽ chia sẻ tên, địa chỉ email, lựa chọn ưu
            tiên về ngôn ngữ và ảnh hồ sơ của bạn với{" "}
            {
              <span className="text-[#0D99FF] font-semibold">
                {dataR.applicationName}
              </span>
            }
            . Hãy xem Chính sách quyền riêng tư và Điều khoản dịch vụ của{" "}
            {
              <span className="text-[#0D99FF] font-semibold">
                {dataR.applicationName}
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
      </div> */}
    </div>
  );
};

export default Index;
