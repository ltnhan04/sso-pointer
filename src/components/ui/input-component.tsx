import { Asterisk } from "lucide-react";

export default function InputComponent({label,subtitle}:{label:string,subtitle:string}) {
    return (
        <>
            <div className="space-y-1">
                <div className="flex">
                    <p className="font-medium">{label}</p>
                    <Asterisk className="size-[12px] text-red-500" />
                </div>
                <button className="w-[440px]">
                    <input type="text" className="w-full outline-none bg-gray-100 border-gray-300 border-[1px] py-[3px] px-[12px] rounded-[6px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
                </button>
                <p className="text-[12px] leading-[18px] text-gray-500">{subtitle}</p>
            </div>
        </>
    )
}