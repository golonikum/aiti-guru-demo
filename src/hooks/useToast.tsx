import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const useToast = () => {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return {
    setToast,
    toastJsx: toast && (
      <div className="fixed bottom-10 right-10 z-[100] flex items-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl animate-bounce-in">
        <CheckCircle className="text-green-400" size={20} />
        <span className="font-medium">{toast}</span>
      </div>
    ),
  };
};
