import HeaderComponent from "@/components/common/headerComponent";
import Sidebar from "@/components/common/sidebar";
import Image from "next/image";
import logo from '../../../../public/images/pointer.png'
export default function Application() {
    const data = [
        {
            name: 'Pointer Wallet',
            image: logo
        }
    ]
    return (
        <>
            <div className="w-full h-screen overflow-auto">
                <HeaderComponent title='Application App' />
                <Sidebar />
                <div className="mt-[125px] max-w-[1000px] lg:mt-[100px] lg:ml-[320px] mx-auto ">
                    <p>You have granted <b>1 applications</b> access to your account</p>
                    {data.map((item,index) => (
                        <div key={index} className="grid grid-cols-[60px_1fr_80px] border-b py-4">
                            <Image src={item.image} alt="Logo" width={50} height={50} />
                            <div>
                                <p className="text-lg text-blue-500">{item.name}</p>
                                <p className="text-sm text-gray-400">Last used within last week. Owned by <u className="text-blue-500">{item.name}</u></p>
                            </div>
                            <button className="text-sm bg-gray-100 border-gray-400 font-medium border-[1px] h-fit text-red-500 rounded-[6px] w-[80px] text-center px-[12px] py-[3px] hover:bg-red-500 hover:text-white hover:border-red-500 hover:transition-colors hover:duration-300 active:opacity-60 active:transform-colors active:duration-300">
                                Revoke
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}