import type { FC } from "react";
import type { CheckboxColumnProps } from "./types";

export const CheckboxColumn: FC<CheckboxColumnProps> = ({
  isHeader,
  checked,
  onChange,
}) => {
  return (
    <>
      <input
        type="checkbox"
        className="input-checkbox align-middle"
        checked={checked}
        onChange={onChange}
      />
      {!isHeader && checked && (
        <div className="absolute left-0 top-0 h-full w-[3px] bg-blue-800" />
      )}
    </>
  );
};
