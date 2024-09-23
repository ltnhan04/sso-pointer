"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

export default function InputOTPPattern() {
  const [value, setValue] = useState<string>("");

  return (
    <InputOTP
      maxLength={6}
      value={value}
      onChange={(value) => setValue(value)}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
    >
      <InputOTPGroup>
        <InputOTPSlot
          index={0}
          className="text-gray-500 border-gray-400 focus:border-[#0D99FF] focus:outline-none"
        />
        <InputOTPSlot
          index={1}
          className="text-gray-500 border-gray-400 focus:border-[#0D99FF] focus:outline-none"
        />
        <InputOTPSlot
          index={2}
          className="text-gray-500 border-gray-400 focus:border-[#0D99FF] focus:outline-none"
        />
        <InputOTPSlot
          index={3}
          className="text-gray-500 border-gray-400 focus:border-[#0D99FF] focus:outline-none"
        />
        <InputOTPSlot
          index={4}
          className="text-gray-500 border-gray-400 focus:border-[#0D99FF] focus:outline-none"
        />
        <InputOTPSlot
          index={5}
          className="text-gray-500 border-gray-400 focus:border-[#0D99FF] focus:outline-none"
        />
      </InputOTPGroup>
    </InputOTP>
  );
}
