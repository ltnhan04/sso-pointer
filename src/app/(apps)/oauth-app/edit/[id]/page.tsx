"use client";
import { GenerateClient, getDetailOAuthApp } from "@/app/api/auth/auth";
import HeaderComponent from "@/components/common/headerComponent";
import InputComponent from "@/components/ui/input-component";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Check,
  KeyRound,
  LoaderCircle,
  Square,
  SquareCheckBig,
} from "lucide-react";
import Image from "next/image";
import nookies from "nookies";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Logo from "../../../../../../public/images/pointer.png";
import AvatarDefault from "../../../../../../public/images/avatardefault.png";
import { useParams } from "next/navigation";
export interface Root {
  _id: string;
  applicationName: string;
  applicationDescription: string;
  clientSecrets: ClientSecret[];
  homePageUrl: string;
  callBackUrl: string;
  userID: UserId;
  createdAt: string;
  updatedAt: string;
  totalUser: number;
}

export interface ClientSecret {
  clientSecret: string;
  userID: string;
  _id: string;
}

export interface UserId {
  _id: string;
  email: string;
}

export default function OAuthDetail() {
  const [applicationName, setApplicationName] = useState("");
  const [applicationDescription, setApplicationDescription] = useState("");
  const [homePageUrl, setHomePageUrl] = useState("");
  const [callBackUrl, setCallBackUrl] = useState("");
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [isCheck, setIsCheck] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [clientSecrets, SetClientSecrets] = useState<ClientSecret[]>([]);

  const onDrop = useCallback((acceptionFile: File[]) => {
    if (acceptionFile.length > 0) {
      const fileUrl = URL.createObjectURL(acceptionFile[0]);
      setAvatarURL(fileUrl);
      console.log(acceptionFile);
    }
  }, []);
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
  });
  const cookies = nookies.get();
  const accessToken = cookies.accessToken || "";
  const { id } = useParams();

  const mutation = useMutation({
    mutationKey: ["client-key-create"],
    mutationFn: async () => {
      const response = await GenerateClient(id as string, accessToken);
      return response.data;
    },
    onSuccess: (newClient: ClientSecret) => {
      SetClientSecrets((prev) => [...prev, newClient]);
      setIsOpen(false);
    },
  });

  const { data, isLoading, isError } = useQuery<Root>({
    queryKey: ["get-oauth-app-detail", id],
    queryFn: async () => {
      const response = await getDetailOAuthApp(id as string, accessToken);
      return response.data;
    },
  });

  console.log(data);
  if (isLoading) return "Loading...";
  if (isError) return "Error...";

  const handleGenericKey = () => {
    mutation.mutate();
    setIsOpen(true);
  };
  return (
    <>
      <div className="w-full">
        <HeaderComponent title="Edit" />
        <div className="w-[700px] mt-[125px] mx-auto">
          <div className="flex items-center space-x-[6px] text-[14px] border-b py-4">
            <Image src={Logo} alt="Logo" width={50} height={50} />
            <p>
              <span className="text-blue-500 font-medium">
                {data?.applicationName}
              </span>{" "}
              owns this application
            </p>
          </div>
          <div className="text-[20px] grid grid-cols-[1fr_150px] py-4 border-b">
            <p>
              <span className="font-medium">0</span> users
            </p>
            <button className="text-red-500 bg-gray-200 border-[1px] border-gray-400 py-[5px] px-[12px] rounded-[6px] text-[12px] font-medium">
              Revoke all user tokens
            </button>
          </div>
          <div className="space-y-[8px] border-b py-4">
            <p className="text-[18px]">Client ID</p>
            <p className="text-[16px] font-mono">{data?._id}</p>
          </div>
          <div className="border-b py-4">
            <div className="grid grid-cols-[1fr_180px] py-4">
              <p className="text-[18px]">Client secrets</p>
              <button
                disabled={isOpen}
                value={isOpen ? "true" : "false"}
                onClick={handleGenericKey}
                className="text-[12px] text-center font-medium bg-gray-200 border-[1px] border-gray-400 py-[5px] px-[12px] rounded-[6px]"
              >
                {isOpen ? (
                  <div className="flex items-center justify-center">
                    <LoaderCircle className="size-4 animate-spin mr-1" />
                    <p>Loading</p>
                  </div>
                ) : (
                  "Generate a new client secret"
                )}
              </button>
            </div>
            <p className="text-[14px] text-gray-700">
              You need a client secret to authenticate as the application to the
              API.
            </p>
          </div>
          {clientSecrets.map((item: ClientSecret, index: number) => (
            <div
              key={index}
              className="grid grid-cols-[120px_1fr] border-b py-4"
            >
              <div className="text-[18px] font-bold flex flex-col justify-center items-center w-fit">
                <KeyRound />
                <p>Client Key</p>
              </div>
              <div className="text-[14px] text-gray-700">
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <p>{item.clientSecret}</p>
                </div>
                <p>Never used</p>
                <p>
                  You cannot delete the only client secret. Generate a new
                  client secret first.
                </p>
              </div>
            </div>
          ))}
          {data?.clientSecrets.map((item: ClientSecret, index: number) => (
            <div
              key={index}
              className="grid grid-cols-[120px_1fr] border-b py-4"
            >
              <div className="text-[18px] font-bold flex flex-col justify-center items-center w-fit">
                <KeyRound />
                <p>Client Key</p>
              </div>
              <div className="text-[14px] text-gray-700">
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <p>{item.clientSecret}</p>
                </div>
                <p>Never used</p>
                <p>
                  You cannot delete the only client secret. Generate a new
                  client secret first.
                </p>
              </div>
            </div>
          ))}
          <div>
            <div className="py-4">
              <p className="font-medium py-2">Application logo</p>
              <div className="flex space-x-[15px]">
                <div {...getRootProps()} className=" cursor-pointer">
                  <Image
                    src={avatarURL || AvatarDefault}
                    alt="Avatar"
                    width={120}
                    height={120}
                  />
                  <input {...getInputProps()} />
                </div>
                <div className="space-y-[8px]">
                  <button
                    onClick={open}
                    className="text-[14px] font-medium  bg-gray-100 border-[1px] border-gray-300 rounded-[6px] py-[5px] px-[12px]"
                  >
                    Upload new logo
                  </button>
                  <p className="text-gray-700 text-[12px]">
                    {isDragActive
                      ? "You can also drag and drop a picture from your computer"
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
            <div className="flex items-center space-x-[6px]">
              <div onClick={() => setIsCheck(!isCheck)}>
                {isCheck ? (
                  <SquareCheckBig className="size-[16px]" />
                ) : (
                  <Square className="size-[16px]" />
                )}
              </div>
              <p className="font-medium">Enable Device Flow</p>
            </div>
            <div className="text-[12px] text-gray-500 border-b pb-4">
              <p>
                Allow this OAuth App to authorize users via the Device Flow.
              </p>
              <p>
                Read the{" "}
                <u className="text-blue-500">Device Flow documentation</u> for
                more information.
              </p>
            </div>
            <div>
              <div className="space-x-[10px] mb-4">
                <button className="bg-blue-700 text-white text-center hover:bg-blue-800 active:opacity-70 transition-all duration-300 py-[5px] px-[16px] text-[14px] rounded-[6px]">
                  Update application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
