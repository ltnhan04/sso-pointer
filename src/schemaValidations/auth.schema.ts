import z from "zod";

export const RegisterBody = z
  .object({
    username: z
      .string()
      .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự")
      .max(30, "Tên đăng nhập không được vượt quá 30 ký tự")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới"
      ),
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
