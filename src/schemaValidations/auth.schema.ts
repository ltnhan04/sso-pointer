import z from "zod";

export const RegisterBody = z
  .object({
    email: z.string().email("Email không hợp lệ"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(100, "Mật khẩu không được vượt quá 100 ký tự")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Mật khẩu phải bao gồm ít nhất một ký tự đặc biệt"
      )
      .regex(/[A-Z]/, "Mật khẩu phải bao gồm ít nhất một ký tự hoa"),
    confirmPassword: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(100, "Mật khẩu không được vượt quá 100 kí tự"),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });
export const LoginBody = z
  .object({
    email: z.string().email("Email không hợp lệ"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(100, "Mật khẩu không được vượt quá 100 ký tự")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Mật khẩu phải bao gồm ít nhất một ký tự đặc biệt"
      )
      .regex(/[A-Z]/, "Mật khẩu phải bao gồm ít nhất một ký tự hoa"),
  })
  .strict();
export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;
export type LoginBodyType = z.TypeOf<typeof LoginBody>;
