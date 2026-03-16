import type { FC } from "react";
import type { TableStubProps } from "./types";

export const TableStub: FC<TableStubProps> = ({ data, isLoading }) =>
  !data?.length &&
  !isLoading && (
    <div className="h-[calc(100%-73px)] text-[20px] text-gray-402 w-full flex flex-col items-center justify-center">
      Ничего не найдено
    </div>
  );
