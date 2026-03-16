import { LoginForm } from "@/features/login";
import { useLogin } from "@/features/login/model/useLogin";

export const LoginPage = () => {
  const loginFormProps = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-102 px-4">
      <LoginForm {...loginFormProps} />
    </div>
  );
};
