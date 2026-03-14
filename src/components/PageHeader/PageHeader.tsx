import { LogOut, Search } from "lucide-react";
import type { FC } from "react";
import type { PageHeaderProps } from "./types";
import { useAuthStore } from "../../store/useAuthStore";

export const PageHeader: FC<PageHeaderProps> = ({ title, onSearch }) => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="bg-white px-[30px] flex items-center gap-4 h-[105px] rounded-[10px] justify-between">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex-1 relative max-w-[1023px]">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 ring-blue-500"
          placeholder="Найти"
          onChange={onSearch}
        />
      </div>
      <button
        onClick={logout}
        className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
      >
        <LogOut size={20} />
      </button>
    </header>
  );
};
