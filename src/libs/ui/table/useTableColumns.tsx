import { Checkbox } from "@mantine/core";
import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { useMemo, type ReactNode } from "react";
import type { TFunction } from "i18next";

export interface TableColumnMeta {
  align?: "left" | "center" | "right";
  cellWidth?: string | number;
  width?: string | number;
}

export interface TableColumns<T extends object> {
  id?: string;
  header: string;
  accessorKey?: string;
  accessorFn?: (originalRow: T) => unknown;
  cell?: (info: CellContext<T, unknown>) => ReactNode;
  meta?: TableColumnMeta;
  enableSorting?: boolean;
}

const SELECT_COL_WIDTH = 40;
const DEFAULT_CELL_WIDTH = 150;

interface UseTableColumnsProps<T extends object> {
  columns: TableColumns<T>[];
  data: T[];
  select?: boolean;
  selectedRows?: T[];
  onSelect?: (item: T | T[]) => void;
  t?: TFunction;
}

export const useTableColumns = <T extends object>({
  columns,
  data,
  select = false,
  selectedRows = [],
  onSelect,
  t,
}: UseTableColumnsProps<T>) => {
  return useMemo(() => {
    const translate = t ?? ((key: string) => key);

    const mappedColumns: ColumnDef<T>[] = columns.map((col) => ({
      id: col.id ?? col.accessorKey,
      accessorKey: col.accessorKey,
      accessorFn: col.accessorFn,
      header: translate(col.header),
      cell: col.cell,
      meta: {
        ...col.meta,
        width: col.meta?.cellWidth ?? DEFAULT_CELL_WIDTH,
      },
    }));

    const allColumns: ColumnDef<T>[] = select
      ? [
          {
            id: "select",
            header: () => (
              <Checkbox
                checked={selectedRows.length > 0 && selectedRows.length === data.length}
                onChange={() => onSelect?.(selectedRows.length === data.length ? [] : data)}
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={selectedRows.some((selected) => selected === row.original)}
                onChange={() => onSelect?.(row.original)}
              />
            ),
            meta: { width: SELECT_COL_WIDTH },
          },
          ...mappedColumns,
        ]
      : mappedColumns;

    const totalMinWidth = columns.reduce<number>(
      (acc, col) =>
        typeof col.meta?.cellWidth === "number"
          ? acc + col.meta.cellWidth
          : acc + DEFAULT_CELL_WIDTH,
      select ? SELECT_COL_WIDTH : 0,
    );

    return { allColumns, totalMinWidth };
  }, [columns, data, select, selectedRows, onSelect, t]);
};
