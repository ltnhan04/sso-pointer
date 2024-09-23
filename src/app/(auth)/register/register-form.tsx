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
import { MultiSelect } from "../../../../components/multi-select";
const servicesList = [
  { value: "traveloki", label: "Traveloki" },
  { value: "emart", label: "Emart" },
  { value: "oggefood", label: "OggeFood" },
  { value: "globetrek", label: "GlobeTrek" },
];

export default function RegisterForm() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: RegisterBodyType) {
    setIsLoading(!isLoading);
    console.log(selectedServices);
    console.log(values);
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
                  className=" focus:border-[#0D99FF] focus:ring-[#0D99FF] text-gray-600"
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
                  className="text-gray-600 focus:border-[#0D99FF] focus:ring-[#0D99FF] "
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
          onClick={() => router.push("/login")}
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
