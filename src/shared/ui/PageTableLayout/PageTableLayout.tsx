import type { FC } from "react";
import type { PageTableLayoutProps } from "./types";

export const PageTableLayout: FC<PageTableLayoutProps> = ({
  body,
  footer,
  header,
}) => (
  <main className="flex-1 overflow-hidden flex flex-col">
    <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col h-full p-[30px] gap-10">
      {header}
      {body}
      {footer}
    </div>
  </main>
);
