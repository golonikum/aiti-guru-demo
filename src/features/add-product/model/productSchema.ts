import * as z from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Минимум 3 символа"),
  price: z
    .float32({ error: "Пожалуйста, введите число" })
    .min(0.0, "Цена должна быть > 0"),
  brand: z.string().min(1, "Укажите вендора"),
  sku: z.string().min(1, "Укажите артикул"),
});
