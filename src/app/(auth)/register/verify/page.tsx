import React from "react";
import HeroSection from "../../../../../components/hero-section";
import InputOTPPattern from "../../../../../components/input-otp";
import Image from "next/image";
export default function VerifyPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full mx-auto p-8 md:p-12 bg-white border-gray-300 rounded-xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <HeroSection />
          <div>
            <div className="flex items-center justify-center">
              <Image
                src={"/images/two-factor-authentication.png"}
                alt="2-factor"
                width={150}
                height={150}
                className="md:w-[120px] w-[100px]"
              />
            </div>
            <h1 className="text-2xl font-bold text-center text-[#0D99FF] mb-4">
              Xác thực tài khoản
            </h1>
            <p className="text-center text-gray-600 font-medium mb-6">
              Vui lòng nhập mã xác thực 6 chữ số.
            </p>
            <div className="flex justify-center">
              <InputOTPPattern />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
