import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";

const productSchema = z.object({
  title: z.string().min(3, "Минимум 3 символа"),
  price: z.number().min(0, "Цена должна быть > 0"),
  brand: z.string().min(1, "Укажите вендора"),
  sku: z.string().min(1, "Укажите артикул"),
});

type ProductForm = z.infer<typeof productSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

export const NewProductDialog = ({ isOpen, onClose, onSuccess }: Props) => {
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Наименование
            </label>
            <input
              {...register("title")}
              className="w-full border rounded-lg p-2.5 focus:ring-2 ring-blue-500 outline-none"
              placeholder="Напр: iPhone 15 Pro"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Цена
              </label>
              <input
                {...register("price", { valueAsNumber: true })}
                type="number"
                className="w-full border rounded-lg p-2.5 focus:ring-2 ring-blue-500 outline-none"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Вендор
              </label>
              <input
                {...register("brand")}
                className="w-full border rounded-lg p-2.5 focus:ring-2 ring-blue-500 outline-none"
                placeholder="Apple"
              />
              {errors.brand && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.brand.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Артикул
            </label>
            <input
              {...register("sku")}
              className="w-full border rounded-lg p-2.5 focus:ring-2 ring-blue-500 outline-none"
              placeholder="SKU-778899"
            />
            {errors.sku && (
              <p className="text-red-500 text-xs mt-1">{errors.sku.message}</p>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
              {isSubmitting ? "Сохранение..." : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
