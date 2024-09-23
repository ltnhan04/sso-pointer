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
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "@/app/api/auth/auth";
export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
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
      console.error(error);
      setError("Tài khoản hoặc mật khẩu sai");
      setIsLoading(false);
    },
    onSuccess: ({ data }) => {
      console.log(data);
      setIsLoading(false);
      router.push("/");
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
        {error && <h1 className="text-center text-sm text-red-500">{error}</h1>}
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
