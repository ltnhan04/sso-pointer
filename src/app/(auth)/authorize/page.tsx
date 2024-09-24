"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authorizeAPI, getOAuthApp, getProfile } from "@/app/api/auth/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface IAuthorize {
  clientId: string;
  redirectUri: string;
  scope: string;
}

interface IAuthorizeResponse {
  code: string;
}

const Index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId") || " ";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const rs = await getProfile();
      return rs.data;
    },
    retry: 0,
  });

  const {
    data: dataR,
    isLoading: isLoadingR,
    isError: isErrorR,
  } = useQuery({
    queryKey: ["oauth-profile"],
    queryFn: async () => {
      const rs = await getOAuthApp(clientId);
      return rs.data;
    },
    retry: 0,
  });

  const { mutate } = useMutation({
    mutationFn: async (body: IAuthorize): Promise<IAuthorizeResponse> => {
      const rs = await authorizeAPI(body);
      return rs.data;
    },
    onSuccess: (data: IAuthorizeResponse) => {
      window.location.replace(`${dataR.callBackUrl}?code=${data.code}`);
    },
  });

  if (isLoading || isLoadingR) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    router.push("/login?clientId=123123");
  }

  if (isErrorR) {
    return <h1>Client ID not found</h1>;
  }

  const handleAccept = () => {
    mutate({
      clientId: clientId,
      redirectUri: "",
      scope: "user",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
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
      </div>
    </div>
  );
};

export default Index;
