import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { getApps } from "@/app/api/app/app";
import { CustomCard } from "./custom-card";

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
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden flex items-center border p-4"
          >
            <Skeleton className="h-14 w-14 rounded-full object-cover" />
            <div className="ml-4 flex-1">
              <Skeleton className="h-4 w-3/4 rounded-lg" />
              <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />
            </div>
          </div>
        ))}
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
