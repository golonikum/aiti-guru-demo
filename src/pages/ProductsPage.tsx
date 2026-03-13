import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  RefreshCw,
  Plus,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  LogOut,
  CheckCircle,
} from "lucide-react";
import { api } from "../api/api";
import { useAuthStore } from "../store/useAuthStore";
import { NewProductDialog } from "../components/NewProductDialog";
import type { ProductsResponse } from "../api/types";
import { useDebounce } from "../hooks/useDebounce";

export const ProductsPage = () => {
  // ... (предыдущие состояния: search, page, sortBy, order)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Авто-скрытие тоста
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleAddSuccess = (name: string) => {
    setToast(`Товар "${name}" успешно добавлен!`);
  };

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const limit = 20;
  const logout = useAuthStore((s) => s.logout);

  const { data, isLoading, refetch } = useQuery<ProductsResponse>({
    queryKey: ["products", search, page, sortBy, order],
    queryFn: async () => {
      const skip = (page - 1) * limit;
      const res = await api.get(
        `/products/search?q=${search}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`,
      );
      return res.data;
    },
  });

  const handleSort = (field: string) => {
    if (sortBy === field) setOrder(order === "asc" ? "desc" : "asc");
    else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const handleSearchDebounced = useDebounce(handleSearch);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 right-10 z-[100] flex items-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl animate-bounce-in">
          <CheckCircle className="text-green-400" size={20} />
          <span className="font-medium">{toast}</span>
        </div>
      )}

      {/* ProgressBar при загрузке */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-200 overflow-hidden">
          <div className="h-full bg-blue-600 animate-progress origin-left"></div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center gap-4">
        <h1 className="text-xl font-bold">Товары</h1>
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 ring-blue-500"
            placeholder="Поиск товаров..."
            onChange={handleSearchDebounced}
          />
        </div>
        <button
          onClick={logout}
          className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
        >
          <LogOut size={20} />
        </button>
      </header>

      <main className="p-6">
        <div className="bg-white rounded-lg shadow border border-gray-200">
          {/* Toolbar */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold text-gray-700">Все позиции</h2>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setPage(1);
                  refetch();
                }}
                className="p-2 hover:bg-gray-100 border rounded"
              >
                <RefreshCw size={18} />
              </button>
              <button
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus size={18} /> Добавить
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b text-gray-600">
                <tr>
                  <th className="p-4">
                    <input type="checkbox" />
                  </th>
                  <th className="p-4">Наименование</th>
                  <th className="p-4">Вендор</th>
                  <th className="p-4">Артикул</th>
                  <th
                    className="p-4 cursor-pointer"
                    onClick={() => handleSort("rating")}
                  >
                    Оценка <ArrowUpDown size={14} className="inline" />
                  </th>
                  <th
                    className="p-4 cursor-pointer"
                    onClick={() => handleSort("price")}
                  >
                    Цена <ArrowUpDown size={14} className="inline" />
                  </th>
                  <th className="p-4">₽</th>
                  <th className="p-4">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data?.products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <input type="checkbox" />
                    </td>
                    <td className="p-4 font-medium">{p.title}</td>
                    <td className="p-4 text-gray-500">{p.brand || "N/A"}</td>
                    <td className="p-4 text-gray-500">#{p.id}</td>
                    <td className="p-4">{p.rating}</td>
                    <td className="p-4">{p.price}</td>
                    <td className="p-4 text-gray-400">RUB</td>
                    <td className="p-4">...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t flex justify-between items-center text-gray-500">
            <div>
              Показано {(page - 1) * limit + 1}-
              {Math.min(page * limit, data?.total || 0)} из {data?.total || 0}
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 border rounded disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="px-4">Страница {page}</span>
              <button
                disabled={page * limit >= (data?.total || 0)}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 border rounded disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Dialog */}
      <NewProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
};
