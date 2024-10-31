"use client"
import MenuAppItem from './menu-app-item'
import LogoPointer from '../../../public/images/pointer.png'
export default function MenuApp() {
  return (
    <>
        <div className=' absolute bot-0 right-[-80px] z-20 p-3 mt-3 bg-white border rounded-lg shadow-lg mr-5 w-[380px] h-[350px] overflow-auto
                        grid grid-cols-3 '
        >
            <MenuAppItem imgPartner={LogoPointer} namePartner='Pointer Wallet' linkPartner='https://pointer.io.vn/'/>
        </div>
    </>
  )
}

