import type { FieldPath, UseFormReturn } from "react-hook-form";

export interface InputFieldProps<T extends Record<string, unknown>> {
  icon?: React.ReactNode;
  action?: React.ReactNode;
  label?: string;
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  clearable?: boolean;
}
