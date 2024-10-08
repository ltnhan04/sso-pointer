import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface CustomCardProps {
  image?: string;
  _id: string;
  applicationName: string;
}

export function CustomCard({ image, _id, applicationName }: CustomCardProps) {
  const router = useRouter();
  return (
    <div className=" max-w-sm my-2 bg-white rounded-lg  overflow-hidden flex items-center border shadow-lg ">
      <div className="flex items-center gap-4 px-3 py-2">
        <Avatar>
          <AvatarImage
            src={
              image != undefined
                ? image
                : `https://avatars.githubusercontent.com/u/20935242?s=80&v=4`
            }
          />
          <AvatarFallback>Partner</AvatarFallback>
        </Avatar>

        <div className="pl-2">
          <h2 className="text-xl font-semibold text-primary">
            {applicationName}
          </h2>
          <p className="mt-1 text-gray-600">{_id}</p>
        </div>
        <Button
          onClick={() => {
            router.push(`/details/${_id}`);
          }}
          className=" ml-auto w-fit bg-[#0D99FF] transition-colors duration-300
        ease-in-out hover:bg-[#0d9affc7]"
        >
          View
        </Button>
      </div>
    </div>
  );
}
