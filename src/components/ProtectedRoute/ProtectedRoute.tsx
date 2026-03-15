import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import type { FC, PropsWithChildren } from "react";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  // Если токена нет ни в стейте, ни в хранилищах — только тогда редирект на логин
  const hasToken =
    token || localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!hasToken) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
