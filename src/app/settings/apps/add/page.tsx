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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AppBody, AppBodyType } from "@/schemaValidations/app.schema";
import { addApp } from "@/app/api/app/app";
interface IApp {
  applicationName: string;
  applicationDescription: string;
  homePageUrl: string;
  callBackUrl: string;
}
const AddApp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string>();
  const form = useForm<AppBodyType>({
    resolver: zodResolver(AppBody),
    defaultValues: {
      applicationName: "",
      applicationDescription: "",
      homePageUrl: "",
      callBackUrl: "",
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (body: IApp) => {
      await addApp(body);
    },
    onError: () => {
      setError("Lỗi");
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      router.push("/settings/apps");
    },
  });
  const onSubmit = (body: AppBodyType) => {
    mutate(body);
    setIsLoading(true);
  };
  return (
    <div className="mx-auto max-w-[600px] p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
        >
          <FormField
            control={form.control}
            name="applicationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">App name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: Pointer Wallet"
                    type="text"
                    {...field}
                    {...form.register("applicationName")}
                    className="focus:border-[#0D99FF] focus:ring-[#0D99FF] text-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="applicationDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">
                  App Descriptions
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="8+ characters"
                    type="text"
                    {...field}
                    {...form.register("applicationDescription")}
                    className="focus:border-[#0D99FF] focus:ring-[#0D99FF] text-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="homePageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">
                  App Descriptions
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="pointer.io.vn"
                    type="text"
                    {...field}
                    {...form.register("homePageUrl")}
                    className="focus:border-[#0D99FF] focus:ring-[#0D99FF] text-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="callBackUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">
                  App Descriptions
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="8+ characters"
                    type="text"
                    {...field}
                    {...form.register("callBackUrl")}
                    className="focus:border-[#0D99FF] focus:ring-[#0D99FF] text-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <h1 className="text-center text-sm text-red-500">{error}</h1>
          )}

          <Button
            type="submit"
            className="!mt-8 w-full bg-[#0D99FF] transition-colors duration-300 ease-in-out hover:bg-[#0d9affc7]"
          >
            {!isLoading ? (
              "Register"
            ) : (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddApp;
