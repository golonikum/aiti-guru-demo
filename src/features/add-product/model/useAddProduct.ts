import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./productSchema";
import * as z from "zod";

interface UseAddProductProps {
  onSuccess: (name: string) => void;
  onClose: () => void;
}

type ProductForm = z.infer<typeof productSchema>;

export const useAddProduct = ({ onSuccess, onClose }: UseAddProductProps) => {
  const form = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = async (data: ProductForm) => {
    // Имитируем запрос к API
    console.log("Новый товар:", data);

    // Здесь должен быть реальный API запрос
    // await api.post("/products", productData);

    // Имитация задержки
    await new Promise((resolve) => setTimeout(resolve, 500));

    onSuccess(data.title);
    reset();
    onClose();
  };

  return {
    form,
    handleSubmit,
    isSubmitting,
    onSubmit,
    reset,
  };
};
