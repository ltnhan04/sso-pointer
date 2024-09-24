"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import ListApp from "./list-app";

const AppPage = () => {
  const router = useRouter();

  return (
    <div className="max-w-[1200px] w-full p-2 mx-auto">
      <div className="flex justify-between items-center font-semibold  ">
        <h1 className="text-lg">OAuth Apps</h1>
        <div>
          <Button
            onClick={() => {
              router.push("/");
            }}
            className="!mt-8 ml-auto w-fot bg-[#0D99FF] transition-colors duration-300
        ease-in-out hover:bg-[#0d9affc7]"
          >
            New Auth App
          </Button>
        </div>
      </div>
      <ListApp></ListApp>
    </div>
  );
};

export default AppPage;
