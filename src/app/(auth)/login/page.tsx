"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Typewriter } from "react-simple-typewriter";
import LoginForm from "@/app/(auth)/login/login-form";

export default function LoginPage() {
  const imageRef = useRef(null);
  const subtextRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" }
    );
    gsap.fromTo(
      subtextRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, delay: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full mx-auto p-8 md:p-12 bg-white border-gray-300 rounded-xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex-col">
            <Image
              ref={imageRef}
              src={"/images/pointer.png"}
              width={250}
              height={250}
              quality={100}
              alt="pointer"
              className="mx-auto w-auto h-auto"
            />
            <div className="text-center mt-4">
              <h2 className="text-lg font-bold text-[#0D99FF]">
                <Typewriter
                  words={["Empower Your Wallet, Embrace the Future!"]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={50}
                  deleteSpeed={35}
                  delaySpeed={5000}
                />
              </h2>
              <p ref={subtextRef} className="text-sm text-gray-500 mt-2">
                Secure. Fast. Limitless Transactions at Your Fingertips.
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-center text-[#0D99FF] mb-4">
              Đăng nhập
            </h1>
            <p className="text-center text-gray-600 font-medium mb-6">
              Welcome back!
            </p>
            <div className="flex justify-center">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
