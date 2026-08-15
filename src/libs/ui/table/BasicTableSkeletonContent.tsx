import { Skeleton, Table } from "@mantine/core";
import type { Header } from "@tanstack/react-table";
import type { TableColumnMeta } from "./useTableColumns";

interface BasicTableSkeletonContentProps<T extends object> {
  headers: Header<T, unknown>[];
  rowCount: number;
}

export const BasicTableSkeletonContent = <T extends object>({
  headers,
  rowCount,
}: BasicTableSkeletonContentProps<T>) => (
  <Table.Tbody>
    {Array.from({ length: rowCount }).map((_, rowIndex) => (
      <Table.Tr key={rowIndex}>
        {headers.map((header) => {
          const meta = header.column.columnDef.meta as TableColumnMeta | undefined;
          return (
            <Table.Td key={header.id} style={{ width: meta?.width }}>
              <Skeleton height={30} />
            </Table.Td>
          );
        })}
      </Table.Tr>
    ))}
  </Table.Tbody>
);
