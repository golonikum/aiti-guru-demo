import type { loginSchema } from "./loginSchema";
import * as z from "zod";
import type { useLogin } from "./useLogin";

// export interface LoginFormProps {
//   handleSubmit: UseFormHandleSubmit<LoginFormValues>;
//   onSubmit: (data: LoginFormValues) => Promise<void>;
//   form: UseFormReturn<LoginFormValues>;
//   showPassword: boolean;
//   setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
//   serverError: string;
//   isSubmitting: boolean;
// }

export type LoginFormProps = ReturnType<typeof useLogin>;

export type LoginFormValues = z.infer<typeof loginSchema>;
