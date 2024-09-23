"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Typewriter } from "react-simple-typewriter";

export default function HeroSection() {
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
  );
}
