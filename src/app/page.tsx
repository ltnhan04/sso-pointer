"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./api/auth/auth";
import Loading from "@/app/loading";
export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const rs = await getProfile();
      return rs.data;
    },
  });
  return (
    <div className="text-center mt-5">
      {isLoading ? (
        <Loading />
      ) : (
        <h1 className="text-primary">Hello, {data?.email}</h1>
      )}
    </div>
  );
}
