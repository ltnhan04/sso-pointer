"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authorizeAPI, getOAuthApp, getProfile } from "@/app/api/auth/auth";
import { redirect } from "next/navigation";
interface IAuthorize {
  clientId: string;
  redirectUri: string;
  scope: string;
}
const Index = () => {
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
    mutationFn: async (body: IAuthorize) => {
      const rs = await authorizeAPI(body);
      return rs.data;
    },
    onSuccess: (data: unknown) => {
      window.location.replace(`${dataR.callBackUrl}?code=${data?.code}`);
    },
  });
  if (isLoading || isLoadingR) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    redirect("/login?clientId=123123");
  }
  if (isErrorR) {
    return <h1>ClientId not found</h1>;
  }
  const handleAccept = () => {
    mutate({
      clientId: clientId,
      redirectUri: "",
      scope: "user",
    });
  };
  return (
    <div className="bg-gray-50 h-[100vh] pt-20">
      <div className="max-w-[500px] w-full mx-auto border  bg-white p-4 rounded-xl space-y-4">
        <div className="flex items-center">
          <img
            className="w-10 h-10"
            src={"https://i.imgur.com/5cYzRrm.png"}
            alt="logo"
          />
          <h1 className="font-semibold text-center ml-5">
            Đăng nhập bằng Pointer
          </h1>
        </div>
        <div>
          <h1 className="text-lg font-semibold mt-5 text-center">
            {data.email}
          </h1>
          <h1 className="text-2xl font-semibold mt-5 text-center">
            Bạn đang đăng nhập vào{" "}
            <span className="text-red-500">{dataR.applicationName}</span>
          </h1>
          <p className="text-sm text-center">
            Nếu bạn tiếp tục, Pointer sẽ chia sẻ tên, địa chỉ email, lựa chọn ưu
            tiên về ngôn ngữ và ảnh hồ sơ của bạn với abc.com. Hãy xem Chính
            sách quyền riêng tư và Điều khoản dịch vụ của abc.com. Bạn có thể
            quản lý tính năng Đăng nhập bằng Pointer trong Tài khoản Pointer của
            mình.
          </p>
        </div>
        <div className="flex justify-between">
          <Button
            className="!mt-8 font-bold  w-fot  transition-colors duration-300
        ease-in-out hover:bg-[#0d9affc7]"
          >
            Hủy
          </Button>
          <Button
            onClick={handleAccept}
            className="!mt-8 font-bold  w-fot bg-[#0D99FF] transition-colors duration-300
        ease-in-out hover:bg-[#0d9affc7]"
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
