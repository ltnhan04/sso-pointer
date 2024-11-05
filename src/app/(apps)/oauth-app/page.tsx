'use client'

import HeaderComponent from "@/components/common/headerComponent";
import Sidebar from "@/components/common/sidebar";
import Image from "next/image";
import logo from '../../../../public/images/pointer.png'
import { useRouter } from "next/navigation";

export default function OAuthApp() {
    const router = useRouter();

    const handleClickNews = () => {
        router.push('oauth-app/news')
    }
    const data1 = [
        {
            name: 'Pointer Wallet',
            image: logo
        }
    ]
    return (
        <>
            <div className="w-full h-screen overflow-auto">
                <HeaderComponent title='OAuth App' />
                <Sidebar />
                <div className="mt-[125px] max-w-[1000px] lg:mt-[100px] lg:ml-[320px] mx-auto ">
                    <div className="flex justify-between border-b py-4">
                        <p className="text-lg font-medium">Create Oauth App</p>
                        <div>
                            <button onClick={handleClickNews} className="text-sm font-medium bg-gray-200 border-gray-400 border-[1px] rounded-[6px] w-[125px] px-[12px] py-[3px]">
                                New Oauth App
                            </button>
                        </div>
                    </div>
                    {data1.map((item,index) => (
                        <div key={index} className="grid grid-cols-[60px_1fr_80px] border-[1px] px-4 py-4 mt-4 rounded-[6px]">
                            <Image src={item.image} alt="Logo" width={50} height={50} />
                            <div>
                                <p className="text-lg text-blue-500">{item.name}</p>
                                <p className="text-sm text-gray-400">Last used within last week. Owned by <u className="text-blue-500">{item.name}</u></p>
                            </div>
                            <button className="text-sm font-medium h-fit bg-gray-200 border-gray-400 border-[1px] rounded-lg w-[80px] text-center px-[12px] py-[3px] hover:bg-gray-500 hover:text-white hover:transition-colors hover:duration-300 active:opacity-60 active:transform-colors active:duration-300">
                                Edit
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}