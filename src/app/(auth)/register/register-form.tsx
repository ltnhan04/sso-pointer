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
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { registerAPI } from "@/app/api/auth/auth";
import { ToastAction } from "@radix-ui/react-toast";

interface ErrorResponse {
  response: {
    data: {
      message: { message: string; error: string; statusCode: number };
    };
  };
}

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      return await registerAPI({
        name,
        email,
        password,
      });
    },
    onSuccess: (response, variables) => {
      const { email } = variables;

      const messageText: string =
        typeof response.data.message === "string"
          ? response.data.message
          : response.data.message.message;

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
            <ReloadIcon className="w-4 h-4 text-white" />
            {messageText}
          </span>
        ),
      });

      localStorage.setItem("email", email);

      router.push("/register/verify");
      setIsLoading(false);
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
  });

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterBodyType) {
    const { username, password, email } = values;

    setIsLoading(true);
    mutate({
      name: username,
      email: email,
      password: password,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Tên đăng nhập</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tên đăng nhập"
                  {...field}
                  className="focus:outline-2 focus:outline-offset-2 focus:outline-[#0D99FF] text-gray-600 focus:border-[#0D99FF]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  className="focus:outline-2 focus:outline-offset-2 focus:outline-[#0D99FF] text-gray-600 focus:border-[#0D99FF]"
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
                  className="focus:outline-2 focus:outline-offset-2 focus:outline-[#0D99FF] text-gray-600 focus:border-[#0D99FF]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input
                  placeholder="8+ characters"
                  type="password"
                  {...field}
                  className="focus:outline-2 focus:outline-offset-2 focus:outline-[#0D99FF] text-gray-600 focus:border-[#0D99FF]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="!mt-8 w-full bg-[#0D99FF] transition-colors duration-300 ease-in-out hover:bg-[#0d9affc7]"
          disabled={isLoading}
        >
          {!isLoading ? (
            "Đăng ký"
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
