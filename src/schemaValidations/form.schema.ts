import {z} from 'zod'

export const schema = z.object({
    password: z.string(),
    newPassword: z.string().min(8,{message: 'Must be at least 8 characters'}).max(32, {message: 'Password not more 32-digits'}),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword,{
    message: "Password don't match",
    path: ['confirmPassword']
})
 
export type SchemaPassword = z.infer<typeof schema>
