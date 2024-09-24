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
import { MultiSelect } from "../../../../components/multi-select";
import { registerAPI } from "@/app/api/auth/auth";
import { ToastAction } from "@radix-ui/react-toast";

const servicesList = [
  { value: "traveloki", label: "Traveloki" },
  { value: "emart", label: "Emart" },
  { value: "oggefood", label: "OggeFood" },
  { value: "globetrek", label: "GlobeTrek" },
];

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
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
      try {
        setIsLoading(true);
        const response = await registerAPI({
          name,
          email,
          password,
        });
        if (response.status === 201) {
          toast({
            className: `
              bg-[#0d9aff85] 
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
                {response.data.message}
              </span>
            ),
          });

          setTimeout(() => {
            router.push("/register/verify");
          }, 2000);
        }
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error: unknown) => {
      const typedError = error as ErrorResponse;
      const errorMsg = typedError?.response?.data?.message || "Đã xảy ra lỗi!";

      toast({
        variant: "destructive",
        title: "Lỗi!",
        description: errorMsg,
        action: <ToastAction altText="Thử lại">Thử lại!</ToastAction>,
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

        <FormItem>
          <FormLabel className="text-gray-500">Dịch vụ</FormLabel>
          <MultiSelect
            options={servicesList}
            onValueChange={setSelectedServices}
            defaultValue={selectedServices}
            modalPopover={isLoading}
            placeholder="Select services"
            variant="secondary"
            animation={5}
            maxCount={5}
            className="w-full text-gray-600 bg-white border border-gray-300 rounded-md focus:border-[#0D99FF] focus:ring-[#0D99FF] focus:ring-1 focus:outline-none p-2"
          />
        </FormItem>

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
