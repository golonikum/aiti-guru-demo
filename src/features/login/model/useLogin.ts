import { api } from "@/shared/api/api";
import type { ApiError } from "@/shared/api/types";
import { isApiError } from "@/shared/api/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "./loginSchema";
import type { LoginFormValues } from "./types";

export const useLogin = () => {
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

  const onSubmit = async (data: LoginFormValues) => {
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

  return {
    form,
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
    serverError,
    showPassword,
    setShowPassword,
  };
};
