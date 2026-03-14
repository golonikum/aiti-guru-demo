import type { FieldErrors, Path, UseFormRegister } from "react-hook-form";

export interface InputFieldProps<T extends Record<string, unknown>> {
  icon?: React.ReactNode;
  action?: React.ReactNode;
  label?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
