import z from "zod";

export const AppBody = z
  .object({
    applicationName: z
      .string()
      .min(3, "Tên app phải có ít nhất 3 ký tự")
      .max(30, "Tên app không được vượt quá 30 ký tự")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Tên app chỉ được chứa chữ cái, số và dấu gạch dưới"
      ),
    applicationDescription: z
      .string()
      .max(50, "Mô tả app không được vượt quá 30 ký tự")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Mô tả app chỉ được chứa chữ cái, số và dấu gạch dưới"
      ),
    homePageUrl: z.string().url("Url Không hợp lệ"),
    callBackUrl: z.string().url("Url Không hợp lệ"),
  })
  .strict();
export type AppBodyType = z.TypeOf<typeof AppBody>;
