const RUSSIAN_CATEGORIES: Record<string, string> = {
  "home-decoration": "Домашний декор",
  "kitchen-accessories": "Кухонные аксессуары",
  "mens-shirts": "Мужские рубашки",
  "mens-shoes": "Мужская обувь",
  "mens-watches": "Мужские часы",
  "mobile-accessories": "Аксессуары для телефонов",
  "skin-care": "Уход за кожей",
  "sports-accessories": "Спортивные аксессуары",
  "womens-bags": "Женские сумки",
  "womens-dresses": "Женские платья",
  "womens-jewellery": "Женские украшения",
  "womens-shoes": "Женская обувь",
  "womens-watches": "Женские часы",
  automotive: "Автозапчасти",
  beauty: "Косметика",
  fragrances: "Парфюмерия",
  furniture: "Мебель",
  groceries: "Продукты",
  laptops: "Ноутбуки",
  lighting: "Освещение",
  motorcycle: "Мотоциклы",
  smartphones: "Смартфоны",
  sunglasses: "Солнцещитные очки",
  tops: "Топы",
  vehicle: "Транспорт",
};

export const getCategoryInRussian = (category?: string) => {
  return !category ? "" : RUSSIAN_CATEGORIES[category] || category;
};
