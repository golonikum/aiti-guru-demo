import type { FC } from "react";
import LogoIcon from "@/shared/assets/logo.svg?react";
import UserIcon from "@/shared/assets/user-icon.svg?react";
import EyeOffIcon from "@/shared/assets/eye-off.svg?react";
import LockIcon from "@/shared/assets/lock.svg?react";
import type { LoginFormProps } from "../model/types";
import { InputField } from "@/shared/ui";

export const LoginForm: FC<LoginFormProps> = ({
  handleSubmit,
  onSubmit,
  form,
  setShowPassword,
  showPassword,
  serverError,
  isSubmitting,
}) => {
  return (
    <div className="glass-card-wrap">
      <div className="glass-card">
        <div className="logo-icon">
          <LogoIcon />
        </div>

        <div className="flex flex-col gap-3 text-center">
          <h1 className="heading-primary">Добро пожаловать!</h1>
          <p className="secondary-text">Пожалуйста, авторизируйтесь</p>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <InputField
              name="username"
              label="Логин"
              inputProps={{
                placeholder: "Логин (emilys)",
              }}
              form={form}
              icon={<UserIcon />}
            />

            <InputField
              name="password"
              label="Пароль"
              inputProps={{
                type: showPassword ? "text" : "password",
                placeholder: "Пароль (emilyspass)",
              }}
              form={form}
              icon={<LockIcon className="w-6 h-6" />}
              action={
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  onClick={() => setShowPassword((val) => !val)}
                >
                  <EyeOffIcon />
                </button>
              }
              clearable={false}
            />
          </div>

          <div className="flex items-center gap-[10px] mt-5 mb-5">
            <input
              {...form.register("remember")}
              id="remember"
              type="checkbox"
              className="input-checkbox w-[18px] h-[18px]"
            />
            <label
              htmlFor="remember"
              className="text-gray-400 text-center text-base font-medium leading-[150%]"
            >
              Запомнить данные
            </label>
          </div>

          {serverError && (
            <div className="text-red-500 text-sm mb-5">{serverError}</div>
          )}

          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? "Вход..." : "Войти"}
          </button>

          <div className="flex items-center gap-4 mt-4">
            <hr className="flex-1 border-t border-gray-300" />
            <span className="text-gray-102 text-[18px] font-medium">или</span>
            <hr className="flex-1 border-t border-gray-300" />
          </div>
        </form>

        <div className="text-gray-500 text-[18px]">
          Нет аккаунта?{" "}
          <button className="text-blue-700 font-semibold underline decoration-solid decoration-from-font">
            Создать
          </button>
        </div>
      </div>
    </div>
  );
};
