import { getApps } from "@/app/api/app/app";
import { CustomCard } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import React from "react";
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
    return <h1>...isLoading</h1>;
  }
  return (
    <div className="flex flex-wrap  justify-between mt-2">
      {data.map((item: ICard, key: number) => (
        <CustomCard {...item} key={key}></CustomCard>
      ))}
    </div>
  );
};

export default ListApp;
