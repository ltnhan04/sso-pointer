"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const { mutate } = useMutation({
  //   mutationFn: async ({
  //     email,
  //     password,
  //   }: {
  //     email: string;
  //     password: string;
  //   }) => {
  //     console.log(email, password);
  //     await axios.post("https://oauth.pointer.io.vn/auth/sign-in", {
  //       data: { email, password },
  //     });
  //   },
  //   onError: (error: any) => {
  //     console.error("Error:", error);
  //   },
  //   onSuccess: () => {
  //     console.log("Đăng nhập thành công");
  //     router.push(""); // Thay thế bằng route bạn muốn điều hướng
  //   },
  // });

  async function onSubmit(values: LoginBodyType) {
    console.log(values);
    // await mutate({ email: values.email, password: values.password });
    try {
      const response = await axios.post("http://localhost:8888/auth/sign-in", {
        email: values.email,
        password: values.password,
      });
      console.log(response.data);
      console.log("ok");
    } catch (error: any) {
      console.log(error.response);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
      >
        {/* Field Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Email</FormLabel>
              <FormControl>
                <Input
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

        {/* Field Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Mật khẩu</FormLabel>
              <FormControl>
                <Input
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
