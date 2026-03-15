import type { Product } from "@/api/types";

const priceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const getPriceParts = (price: number) => {
  const value = priceFormatter.format(price);
  const index = value.length - 3;

  return {
    integer: value.substring(0, index),
    fraction: value.substring(index),
  };
};

export const PriceRenderer = ({ record }: { record: Product }) => {
  const { fraction, integer } = getPriceParts(record.price);

  return (
    <span className="font-['Roboto_Mono'] text-gray-800">
      {integer}
      <span className="text-gray-402">{fraction}</span>
    </span>
  );
};
