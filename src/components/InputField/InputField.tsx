import clsx from "clsx";
import type { InputFieldProps } from "./types";

export const InputField = <T extends Record<string, unknown>>({
  icon,
  action,
  label,
  register,
  name,
  errors,
  inputProps,
}: InputFieldProps<T>) => {
  return (
    <div className="relative flex flex-col">
      {label && (
        <label htmlFor={name} className="input-label mb-[6px]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...inputProps}
          {...register(name)}
          id={name}
          className={clsx("input-primary", icon && "pl-12", action && "pr-12")}
        />
        {action}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-lg mt-1">
          {errors[name].message as string}
        </p>
      )}
    </div>
  );
};
