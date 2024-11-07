import { CircleCheck } from "lucide-react";

export default function ToastV2() {
    return (
        <div className="flex items-center w-fit border-[1px] rounded-[6px] bg-gray-50 shadow-lg p-2 fixed right-3 top-[100px] ">
            <CircleCheck className="text-green-700 mr-2" />
            Đăng kí thành công!
        </div>
    )
}