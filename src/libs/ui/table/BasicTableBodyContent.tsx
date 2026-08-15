import { Table, Text } from "@mantine/core";
import { flexRender, type Row } from "@tanstack/react-table";
import type { TableColumnMeta } from "./useTableColumns";

interface BasicTableBodyContentProps {
  rows: Row<unknown>[];
}

const cellJustify = (align?: string) => {
  if (align === "right") return "justify-end";
  if (align === "center") return "justify-center";
  return "justify-start";
};

export const BasicTableBodyContent = ({ rows }: BasicTableBodyContentProps) => (
  <Table.Tbody>
    {rows.map((row) => (
      <Table.Tr key={row.id}>
        {row.getVisibleCells().map((cell) => {
          const meta = cell.column.columnDef.meta as TableColumnMeta | undefined;
          return (
            <Table.Td key={cell.id} className="whitespace-nowrap" style={{ width: meta?.width }}>
              <div className={`flex items-center gap-1 ${cellJustify(meta?.align)}`}>
                <Text size="sm">{flexRender(cell.column.columnDef.cell, cell.getContext())}</Text>
              </div>
            </Table.Td>
          );
        })}
      </Table.Tr>
    ))}
  </Table.Tbody>
);
