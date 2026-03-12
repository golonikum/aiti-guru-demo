import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ApiError } from "../api/types";
import { isApiError } from "../api/utils";

const loginSchema = z.object({
  username: z.string().min(1, "Логин обязателен"),
  password: z.string().min(6, "Пароль от 6 символов"),
  remember: z.boolean().default(false),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const [serverError, setServerError] = useState("");
  const login = useAuthStore((state) => state.login);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    // Если токен появился (после логина или при загрузке), уходим на товары
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User size={24} />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Добро пожаловать!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Пожалуйста, авторизируйтесь
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <input
                {...register("username")}
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Логин (emilys)"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message as string}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                {...register("password")}
                type="password"
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Пароль (emilyspass)"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              {...register("remember")}
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Запомнить данные
            </label>
          </div>

          {serverError && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isSubmitting ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};
