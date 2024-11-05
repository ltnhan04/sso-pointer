'use client'
import HeaderComponent from "@/components/common/headerComponent";
import Image from "next/image";
import Logo from '../../../../../../public/images/pointer.png'
import AvatarDefault from '../../../../../../public/images/avatardefault.png'
import InputComponent from "@/components/ui/input-component";
import { useCallback, useState } from "react";
import { Square, SquareCheckBig } from "lucide-react";
import {useDropzone} from 'react-dropzone'
export default function EditNews() {
    const [avatarURL,setAvatarURL] = useState<string | null>(null)
    const onDrop = useCallback((acceptedFiles:File[]) => {
        if (acceptedFiles.length > 0) {
            const fileURL = URL.createObjectURL(acceptedFiles[0])
            setAvatarURL(fileURL)
            console.log(acceptedFiles)

        }
    },[])
    const {getRootProps,getInputProps,open,isDragActive} = useDropzone({onDrop})
    const [isCheck, setIsCheck] = useState(false)

    return (
        <>
            <div className="w-full h-screen overflow-auto">
                <HeaderComponent title='Edit' />
                <div className="w-[700px] mt-[125px] mx-auto">
                    <div className="flex items-center space-x-[6px] text-[14px] border-b py-4">
                        <Image src={Logo} alt="Logo" width={50} height={50} />
                        <p><span className="text-blue-500 font-medium">SanqDuonq</span> owns this application</p>
                    </div>
                    <div className="text-[20px] grid grid-cols-[1fr_150px] py-4 border-b">
                        <p><span className="font-medium">0</span> users</p>
                        <button className="text-red-500 bg-gray-200 border-[1px] border-gray-400 py-[5px] px-[12px] rounded-[6px] text-[12px] font-medium">
                            Revoke all user tokens
                        </button>
                    </div>
                    <div className="space-y-[8px] border-b py-4">
                        <p className="text-[18px]">Client ID</p>
                        <p className="text-[16px] font-mono">Ov23liFflMEOPa1BPIEq</p>
                    </div>
                    <div className="border-b py-4">
                        <div className="grid grid-cols-[1fr_180px] py-4">
                            <p className="text-[18px]">Client secrets</p>
                            <button className="text-[12px] text-center font-medium bg-gray-200 border-[1px] border-gray-400 py-[5px] px-[12px] rounded-[6px]">Generate a new client secret</button>
                        </div>
                        <p className="text-[14px] text-gray-700">You need a client secret to authenticate as the application to the API.</p>
                    </div>
                    <div>
                        <div className="py-4">
                            <p className="font-medium py-2">Application logo</p>
                            <div className="flex space-x-[15px]">
                                <div {...getRootProps()} className=" cursor-pointer">
                                    <Image src={ avatarURL || AvatarDefault } alt='Avatar' width={120} height={120}/>
                                    <input {...getInputProps()}/>
                                </div>
                                <div className="space-y-[8px]">
                                    <button onClick={open} className="text-[14px] font-medium  bg-gray-100 border-[1px] border-gray-300 rounded-[6px] py-[5px] px-[12px]">Upload new logo</button>
                                    <p className="text-gray-700 text-[12px]">{isDragActive ? "You can also drag and drop a picture from your computer" : ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
                            <div className="space-x-[10px] mb-4">
                                <button 
                                    className='bg-blue-700 text-white text-center hover:bg-blue-800 active:opacity-70 transition-all duration-300 py-[5px] px-[16px] text-[14px] rounded-[6px]'
                                >
                                    Update application
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}