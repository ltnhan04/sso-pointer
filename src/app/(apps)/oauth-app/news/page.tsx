"use client";
import { newOAuthApp } from "@/app/api/auth/auth";
import HeaderComponent from "@/components/common/headerComponent";
import InputComponent from "@/components/ui/input-component";
import { useMutation } from "@tanstack/react-query";
import {LoaderCircle} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import nookies from "nookies";
import { useQueryClient } from "@tanstack/react-query";
import ToastV2 from "@/components/ui/toast-v2";
export default function News() {
  const [applicationName, setApplicationName] = useState("");
  const [applicationDescription, setApplicationDescription] = useState("");
  const [homePageUrl, setHomePageUrl] = useState("");
  const [callBackUrl, setCallBackUrl] = useState("");
  const [showToast,setShowToast] = useState(false)
  const queryClient = useQueryClient();
  const router = useRouter();
  const cookies = nookies.get();
  const accessToken = cookies.accessToken || "";
  const mutation = useMutation({
    mutationKey: ["create-oauth-app"],
    mutationFn: async () => {
      return await newOAuthApp({
        applicationName,
        applicationDescription,
        homePageUrl,
        callBackUrl,
        accessToken,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["create-oauth-app"] });
      setTimeout(() => setShowToast(false),3000)
      ToastV2()
      router.push("/oauth-app");

    },
  });

  const handleClickRegister = () => {
    mutation.mutate();
  };
  return (
    <div className="w-full h-screen overflow-auto">
      <HeaderComponent title="Register a new OAuth App" />
      <div className="w-[700px] mt-[125px] mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="w-fit space-y-[15px]">
            <InputComponent
              type="text"
              value={applicationName}
              onChange={(e) => setApplicationName(e.target.value)}
              label="Application Name"
              subtitle="Something users will recognize and trust."
            />
            <InputComponent
              type="text"
              value={homePageUrl}
              onChange={(e) => setHomePageUrl(e.target.value)}
              label="HomePage URL"
              subtitle="The full URL to your application homepage."
            />
            <div className="space-y-1">
              <div>
                <p className="font-medium">Application Description</p>
              </div>
              <div className="w-[250px]">
                <input
                  type="text"
                  value={applicationDescription}
                  onChange={(e) => setApplicationDescription(e.target.value)}
                  className="w-full h-[50px] outline-none bg-gray-200 border-gray-400 border-[1px] py-[3px] px-[12px] rounded-[6px] placeholder:text-[14px] placeholder:text-gray-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Application description is optional"
                />
              </div>
              <p className="text-[12px] leading-[18px] text-gray-500">
                This is displayed to all users of your application.
              </p>
            </div>
            <InputComponent
              type="text"
              value={callBackUrl}
              onChange={(e) => setCallBackUrl(e.target.value)}
              label="Authorization callback URL"
              subtitle="Your application's callback URL. Read our OAuth documentation for more information."
            />
            <div>
              <div className="space-x-[10px] flex">
                <button
                  onClick={handleClickRegister}
                  className="bg-blue-700 text-white w-[160px] text-center hover:bg-blue-800 active:opacity-70 transition-all duration-300 py-[5px] px-[16px] text-[14px] rounded-[6px]"
                >
                  {mutation.isPending
                  ? (
                    <div className="flex justify-center">
                      <LoaderCircle className="size-5 animate-spin mr-2"/>
                      <p>Loading</p>
                    </div>
                    )
                  : 'Register application'}
                </button>
                <button className="text-blue-700 text-[14px] hover:bg-gray-200 py-[5px] px-[16px] rounded-[6px]">
                  Cancel
                </button>
              </div>
              {showToast && (
                <ToastV2/>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
