"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import ListApp from "../../components/list-app";
export default function Home() {
  const router = useRouter();

  return (
    <div className="max-w-7xl w-full p-8 mx-auto">
      <div className="flex justify-between items-center font-semibold  ">
        <h1 className="text-lg text-primary">OAuth Apps</h1>
        <div>
          <Button
            onClick={() => {
              router.push("/add-app");
            }}
            className="ml-auto w-fit bg-[#0D99FF] transition-colors duration-300
    ease-in-out hover:bg-[#0d9affc7]"
          >
            New Auth App
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <ListApp />
      </div>
    </div>
  );
}
