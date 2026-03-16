import type { FC } from "react";
import type { PageProgressBarProps } from "./types";

export const PageProgressBar: FC<PageProgressBarProps> = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="fixed top-0 left-0 w-full h-1 bg-blue-200 overflow-hidden">
        <div className="h-full bg-blue-600 animate-progress origin-left"></div>
      </div>
    )
  );
};
