import type { TableItemType, TableProps } from "./types";
import { TableRow } from "./TableRow";
import { TableHeader } from "./TableHeader";
import { TableStub } from "./TableStub";

export const Table = <T extends TableItemType>({
  data,
  columns,
  onSort,
  selectedIds,
  onSelectAll,
  onSelectRow,
  isLoading,
}: TableProps<T>) => {
  const allSelected = !!data?.length && selectedIds.length === data?.length;

  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full text-left text-sm table-fixed text-[16px]">
        <TableHeader
          columns={columns}
          allSelected={allSelected}
          onSelectAll={onSelectAll}
          onSort={onSort}
        />
        <tbody className="divide-y divide-gray-200">
          {data?.map((record) => (
            <TableRow
              columns={columns}
              record={record}
              key={record.id}
              selectedIds={selectedIds}
              onSelectRow={onSelectRow}
            />
          ))}
        </tbody>
      </table>
      <TableStub data={data} isLoading={isLoading} />
    </div>
  );
};
