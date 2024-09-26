import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { getApps } from "@/app/api/app/app";
import { CustomCard } from "./custom-card";
import { ReloadIcon } from "@radix-ui/react-icons";

interface ICard {
  image?: string;
  _id: string;
  applicationName: string;
}

const ListApp = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-apps"],
    queryFn: async () => {
      const rs = await getApps();
      return rs.data;
    },
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <ReloadIcon className="animate-spin h-8 w-8 text-[#0D99FF]" />
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap gap-4 justify-center">
      {data.length === 0 ? (
        <div className="w-full text-center text-xl text-gray-500 font-semibold">
          Bạn chưa thêm bất kỳ App nào. Hãy liên kết App ngay!
        </div>
      ) : (
        <>
          {data.map((item: ICard, key: number) => (
            <CustomCard {...item} key={key} />
          ))}
        </>
      )}
    </div>
  );
};

export default ListApp;
