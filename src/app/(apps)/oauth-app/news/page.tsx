'use client'
import HeaderComponent from "@/components/common/headerComponent";
import InputComponent from "@/components/ui/input-component";
import { Square, SquareCheckBig } from 'lucide-react'
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function News() {
    const [isCheck, setIsCheck] = useState(false)
    const router = useRouter();

    const handleClickRegister = () => {
        router.push('/oauth-app/news/edit')
    }
    return (
        <div className="w-full h-screen overflow-auto">
            <HeaderComponent title="Register a new OAuth App" />
            <div className="w-[700px] mt-[125px] mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-fit space-y-[15px]">
                        <InputComponent label="Application Name" subtitle="Something users will recognize and trust." />
                        <InputComponent label="HomePage URL" subtitle="The full URL to your application homepage." />
                        <div className="space-y-1">
                            <div>
                                <p className="font-medium">Application Description</p>
                            </div>
                            <div className="w-[250px]">
                                <input
                                    type="text"
                                    className="w-full h-[50px] outline-none bg-gray-200 border-gray-400 border-[1px] py-[3px] px-[12px] rounded-[6px] placeholder:text-[14px] placeholder:text-gray-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Application description is optional"
                                />
                            </div>
                            <p className="text-[12px] leading-[18px] text-gray-500">
                                This is displayed to all users of your application.
                            </p>
                        </div>
                        <InputComponent label="Authorization callback URL" subtitle="Your application's callback URL. Read our OAuth documentation for more information." />
                        <div className="flex items-center space-x-[6px]">
                            <div onClick={() => setIsCheck(!isCheck)}>
                                {isCheck ? <SquareCheckBig className="size-[16px]" /> : <Square className="size-[16px]" />}
                            </div>
                            <p className="font-medium">Enable Device Flow</p>
                        </div>
                        <div className="text-[12px] text-gray-500 border-b pb-4">
                            <p>
                                Allow this OAuth App to authorize users via the Device Flow.
                            </p>
                            <p>
                                Read the <u className="text-blue-500">Device Flow documentation</u> for more information.
                            </p>
                        </div>
                        <div>
                            <div className="space-x-[10px]">
                                <button 
                                    onClick={handleClickRegister}
                                    className='bg-blue-700 text-white text-center hover:bg-blue-800 active:opacity-70 transition-all duration-300 py-[5px] px-[16px] text-[14px] rounded-[6px]'
                                >
                                    Register application
                                </button>
                                <button className='text-blue-700 text-[14px] hover:bg-gray-200 py-[5px] px-[16px] rounded-[6px]'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

