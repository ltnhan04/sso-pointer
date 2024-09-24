import { Button } from "./button";
import { useRouter } from "next/navigation";
interface CustomCardProps {
  image?: string;
  _id: string;
  applicationName: string;
}
export function CustomCard({ image, _id, applicationName }: CustomCardProps) {
  const router = useRouter();
  return (
    <div className="max-w-sm my-2 bg-white rounded-lg  overflow-hidden flex items-center border p-3">
      <img
        className="h-14 w-14 rounded-full object-cover"
        src={
          image !== undefined
            ? image
            : "https://avatars.githubusercontent.com/u/20935242?s=80&v=4"
        }
        alt="Logo App"
      />
      <div className="pl-2">
        <h2 className="text-xl font-semibold text-gray-800">
          {applicationName}
        </h2>
        <p className="mt-1 text-gray-600">{_id}</p>
      </div>
      <Button
        onClick={() => {
          router.push("/");
        }}
        className=" ml-auto w-fit bg-[#0D99FF] transition-colors duration-300
        ease-in-out hover:bg-[#0d9affc7]"
      >
        View
      </Button>
    </div>
  );
}
