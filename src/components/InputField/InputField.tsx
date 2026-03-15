import clsx from "clsx";
import type { InputFieldProps } from "./types";
import CloseIcon from "@/assets/close-icon.svg?react";

export const InputField = <T extends Record<string, unknown>>({
  icon,
  action,
  label,
  form,
  name,
  inputProps,
  clearable = true,
}: InputFieldProps<T>) => {
  const {
    formState: { errors },
    register,
    watch,
    resetField,
    setFocus,
  } = form;

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
          {...register(name, { valueAsNumber: inputProps?.type === "number" })}
          id={name}
          className={clsx("input-primary", icon && "pl-12", action && "pr-12")}
        />
        {clearable && watch?.(name) && (
          <button
            type="button"
            className="absolute inset-y-0 right-4 flex items-center p-1 transition-colors cursor-pointer"
            onClick={() => {
              resetField(name);
              setFocus(name);
            }}
          >
            <CloseIcon />
          </button>
        )}
        {action}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-lg mt-0.5">
          {errors[name].message as string}
        </p>
      )}
    </div>
  );
};
