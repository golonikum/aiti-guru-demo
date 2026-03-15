import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/store/useAuthStore";
import { api } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ApiError } from "@/api/types";
import { isApiError } from "@/api/utils";
import LogoIcon from "@/assets/logo.svg?react";
import UserIcon from "@/assets/user-icon.svg?react";
import EyeOffIcon from "@/assets/eye-off.svg?react";
import LockIcon from "@/assets/lock.svg?react";
import { InputField } from "@/components/InputField";

const loginSchema = z.object({
  username: z.string().min(1, "Логин обязателен"),
  password: z.string().min(1, "Пароль обязателен"),
  remember: z.boolean().default(false),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const [serverError, setServerError] = useState("");
  const login = useAuthStore((state) => state.login);
  const token = useAuthStore((state) => state.token);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (token) {
      navigate("/products", { replace: true });
    }
  }, [token, navigate]);

  const onSubmit = async (data: LoginForm) => {
    try {
      setServerError("");
      const res = await api.post("/auth/login", {
        username: data.username,
        password: data.password,
      });
      login(res.data, res.data.token, data.remember);
      navigate("/products");
    } catch (err: unknown) {
      let message = "Ошибка авторизации";

      if (err instanceof Error) {
        message = err.message;
      } else if (isApiError(err)) {
        const apiError = err as ApiError;
        message = apiError.response?.data?.message || message;
      }

      setServerError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-102 px-4">
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
                {...register("remember")}
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
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
    </div>
  );
};
