import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import { InputField } from "@/components/InputField";
import type { NewProductDialogProps } from "./types";

const productSchema = z.object({
  title: z.string().min(3, "Минимум 3 символа"),
  price: z
    .float32({ error: "Пожалуйста, введите число" })
    .min(0.0, "Цена должна быть > 0"),
  brand: z.string().min(1, "Укажите вендора"),
  sku: z.string().min(1, "Укажите артикул"),
});

type ProductForm = z.infer<typeof productSchema>;

export const NewProductDialog = ({
  isOpen,
  onClose,
  onSuccess,
}: NewProductDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  if (!isOpen) return null;

  const onSubmit = (data: ProductForm) => {
    // Имитируем запрос к API
    console.log("Новый товар:", data);
    setTimeout(() => {
      onSuccess(data.title);
      reset();
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Новый товар</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <InputField
            name="title"
            label="Наименование"
            register={register}
            errors={errors}
            inputProps={{
              placeholder: "Напр: iPhone 15 Pro",
            }}
          />
          <InputField
            name="price"
            label="Цена"
            register={register}
            errors={errors}
            inputProps={{
              placeholder: "0.00",
              type: "number",
              step: 0.01,
            }}
          />
          <InputField
            name="brand"
            label="Вендор"
            register={register}
            errors={errors}
            inputProps={{
              placeholder: "Apple",
            }}
          />
          <InputField
            name="sku"
            label="Артикул"
            register={register}
            errors={errors}
            inputProps={{
              placeholder: "SKU-778899",
            }}
          />

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1"
            >
              {isSubmitting ? "Сохранение..." : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
