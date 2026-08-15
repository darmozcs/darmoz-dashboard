import { Table } from "@mantine/core";
import { flexRender, type HeaderGroup } from "@tanstack/react-table";
import type { TableColumnMeta } from "./useTableColumns";

interface BasicTableHeadContentProps {
  headerGroups: HeaderGroup<unknown>[];
}

export const BasicTableHeadContent = ({ headerGroups }: BasicTableHeadContentProps) => (
  <Table.Thead style={{ backgroundColor: "var(--mantine-primary-color-filled)" }}>
    {headerGroups.map((headerGroup) => (
      <Table.Tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          const meta = header.column.columnDef.meta as TableColumnMeta | undefined;
          return (
            <Table.Th
              key={header.id}
              className="font-bold text-white"
              style={{ width: meta?.width }}
              ta={meta?.align}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </Table.Th>
          );
        })}
      </Table.Tr>
    ))}
  </Table.Thead>
);
