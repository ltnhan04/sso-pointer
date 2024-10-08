"use client";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@radix-ui/react-toast";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { verifyAccount } from "@/app/api/auth/auth";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { setCookie } from "cookies-next";

interface ErrorResponse {
  response: {
    data: {
      message: { message: string; error: string; statusCode: number };
    };
  };
}

export default function InputOTPPattern() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const e = localStorage.getItem("email");
    if (e) {
      setEmail(e);
    }
  }, []);

  const { mutate } = useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      return await verifyAccount({ email, otp });
    },
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data;

      setCookie("accessToken", accessToken, { maxAge: 60 * 15 });
      setCookie("refreshToken", refreshToken, { maxAge: 60 * 60 * 24 * 15 });

      toast({
        className: `
          bg-[#0D99FF] 
          text-white    
          border border-[#0B85DC] 
          rounded-lg 
          shadow-lg 
          p-4 
          flex items-center
          transition-all 
          duration-300 
          ease-in-out
        `,
        description: (
          <span className="flex items-center gap-2">
            <CheckCircledIcon className="w-4 h-4 text-white" />
            Xác thực OTP thành công!
          </span>
        ),
      });
      router.push("/");
    },
    onError: (error: ErrorResponse) => {
      const errorMsg = error.response.data.message;
      const { message } = errorMsg;

      toast({
        variant: "destructive",
        title: errorMsg.error + " " + errorMsg.statusCode,
        description: message,
        action: <ToastAction altText="Try again">Try Again!</ToastAction>,
      });
    },
  });

  const handleChangeOTP = (otp: string) => {
    setValue(otp);
    if (otp.length === 6 && email) {
      mutate({ email, otp });
    }
  };

  return (
    <div>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={handleChangeOTP}
        pattern={REGEXP_ONLY_DIGITS}
      >
        <InputOTPGroup>
          {Array.from({ length: 6 }, (_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="text-gray-500 border-gray-400 focus:outline-none"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
