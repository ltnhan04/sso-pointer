import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
export default function MenuAppItem({imgPartner,namePartner,linkPartner}:{imgPartner:StaticImageData,namePartner:string,linkPartner:string}){
    return (
        <>
            <Link href={linkPartner} target='_blank' className='hover:bg-gray-200 h-fit flex flex-col justify-center items-center p-3 rounded-lg cursor-pointer'>
                <Image src={imgPartner} alt='LogoPartner' width={50} height={50} />
                <p className='w-[60px] break-words whitespace-normal font-medium text-gray-700 mt-1 text-center'>{namePartner}</p>
            </Link>
        </>
    )
}