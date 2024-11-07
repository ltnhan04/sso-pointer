"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { loginAPI } from "@/app/api/auth/auth";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { setCookie } from "cookies-next";
interface ErrorResponse {
  response: {
    data: {
      message: { message: string; error: string; statusCode: number };
    };
  };
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId") || " ";
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      setIsLoading(true);
      return await loginAPI({
        email,
        password,
      });
    },
    onError: (error: unknown) => {
      const errorMsg = (error as ErrorResponse)?.response?.data?.message;
      const { message } = errorMsg;

      toast({
        variant: "destructive",
        title: errorMsg.error + " " + errorMsg.statusCode,
        description: message,
        action: <ToastAction altText="Try again">Try Again!</ToastAction>,
      });

      setIsLoading(false);
    },
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data;
      setCookie("accessToken", accessToken, { maxAge: 60 * 60  });
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
            Đăng nhập thành công!
          </span>
        ),
      });
      console.log(clientId);
      if (clientId !== " ") {
        router.push(`/authorize?clientId=${clientId}`);
        return;
      }
      router.push("/");

      setIsLoading(false);
    },
  });

  async function onSubmit(values: LoginBodyType) {
    mutate({ email: values.email, password: values.password });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="example@gmail.com"
                  type="email"
                  {...field}
                  {...form.register("email")}
                  className="focus:border-[#0D99FF] focus:ring-[#0D99FF] text-gray-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Mật khẩu</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="8+ characters"
                  type="password"
                  {...field}
                  {...form.register("password")}
                  className="focus:border-[#0D99FF] focus:ring-[#0D99FF] text-gray-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="!mt-8 w-full bg-[#0D99FF] transition-colors duration-300 ease-in-out hover:bg-[#0d9affc7]"
        >
          {!isLoading ? (
            "Đăng nhập"
          ) : (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
