"use client";
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateClientSecretAPI, getDetails } from "@/app/api/app/app";
import { toast } from "@/hooks/use-toast";
import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons";

interface AppDetailsProps {
  params: { id: string };
}

const AppDetails: React.FC<AppDetailsProps> = ({ params }) => {
  const [isloadingGenerate, setIsLoadingGenerate] = useState<boolean>();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["appDetails", params.id],
    queryFn: async () => await getDetails(params.id),
  });
  const { mutate } = useMutation({
    mutationFn: async (clientId: string) => {
      setIsLoadingGenerate(true);
      await generateClientSecretAPI(clientId);
    },
    onError: (error) => {
      setIsLoadingGenerate(false);
      toast({
        className: `
          bg-[#0D99FF] 
          text-white    
          border border-[#0B85DC] 
          rounded-lg 
          shadow-lg 
          p-4 
          flex items-center
          transition-all 
          duration-300 
          ease-in-out
        `,
        description: (
          <span className="flex items-center gap-2">
            <CheckCircledIcon className="w-4 h-4 text-white" />
            Try again
          </span>
        ),
      });
      console.log(error);
    },
    onSuccess: () => {
      setIsLoadingGenerate(false);
      toast({
        className: `
          bg-[#0D99FF] 
          text-white    
          border border-[#0B85DC] 
          rounded-lg 
          shadow-lg 
          p-4 
          flex items-center
          transition-all 
          duration-300 
          ease-in-out
        `,
        description: (
          <span className="flex items-center gap-2">
            <CheckCircledIcon className="w-4 h-4 text-white" />
            Generate new client secret success
          </span>
        ),
      });
    },
  });
  const handleGenerate = () => {
    mutate(params.id);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl w-full mx-auto p-8 md:p-12 bg-white border-gray-300 rounded-xl shadow-xl">
        {isLoading ? (
          <Card className="animate-pulse">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 mt-2 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-full rounded mb-4" />
              <Skeleton className="h-5 w-full rounded" />
            </CardContent>
          </Card>
        ) : isError ? (
          <Card className="p-6 text-center text-red-500">
            <CardHeader>
              <CardTitle>Lỗi!</CardTitle>
              <CardDescription>Không thể xem chi tiết app.</CardDescription>
            </CardHeader>
            <Button variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{data?.applicationName}</CardTitle>
              <CardDescription>
                được tạo bởi: {data?.userID?.email} vào{" "}
                {new Date(data?.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-gray-500 font-semibold">ClientId:</p>
                <p>{data?._id}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Description:</p>
                <p>{data?.applicationDescription}</p>
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="text-gray-500 font-semibold">Client Secret:</p>
                  <Button onClick={handleGenerate} className="text-sm ">
                    {!isloadingGenerate ? (
                      "Generate new a client secret"
                    ) : (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait...
                      </>
                    )}
                  </Button>
                </div>
                {data.clientSecrets.map(
                  (item: { clientSecret: string }, key: number) => (
                    <div className="flex" key={key}>
                      <h1>{item.clientSecret}</h1>
                    </div>
                  )
                )}
              </div>

              <div>
                <p className="text-gray-500 font-semibold">Homepage URL:</p>
                <a
                  href={data?.homePageUrl}
                  className="text-[#0D99FF] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data?.homePageUrl}
                </a>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Callback URL:</p>
                <a
                  href={data?.callBackUrl}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data?.callBackUrl}
                </a>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AppDetails;
