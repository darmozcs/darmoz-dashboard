import { Table } from "@mantine/core";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { BasicTableBodyContent } from "./BasicTableBodyContent";
import { BasicTableEmpty } from "./BasicTableEmpty";
import { BasicTableError } from "./BasicTableError";
import { BasicTableHeadContent } from "./BasicTableHeadContent";
import { BasicTablePagination } from "./BasicTablePagination";
import { BasicTableSkeletonContent } from "./BasicTableSkeletonContent";
import { useTableColumns, type TableColumns } from "./useTableColumns";
import type { GenericTableProps } from "./BasicTable.types";

export type { TableColumns };

export function BasicTable<T extends object>({
  columns,
  data,
  isLoading,
  error,
  select = false,
  onSelect,
  selectedRows = [],
  pagination = false,
  pages,
  currentPage,
  onPageChange,
  itemsPerPage = 10,
  onItemsPerPageChange,
  maxHeight,
  t,
}: GenericTableProps<T>) {
  const { allColumns, totalMinWidth } = useTableColumns({
    columns,
    data,
    select,
    selectedRows,
    onSelect,
    t,
  });

  const table = useReactTable<T>({
    data,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (isLoading) {
    const headers = table.getHeaderGroups()[0]?.headers ?? [];
    return (
      <Table.ScrollContainer minWidth={totalMinWidth} maxHeight={maxHeight}>
        <Table>
          <BasicTableHeadContent headerGroups={table.getHeaderGroups()} />
          <BasicTableSkeletonContent headers={headers} rowCount={itemsPerPage} />
        </Table>
      </Table.ScrollContainer>
    );
  }

  if (error) return <BasicTableError />;
  if (data.length === 0) return <BasicTableEmpty />;

  return (
    <div className="flex flex-col">
      <Table.ScrollContainer minWidth={totalMinWidth} maxHeight={maxHeight}>
        <Table>
          <BasicTableHeadContent headerGroups={table.getHeaderGroups()} />
          <BasicTableBodyContent rows={table.getRowModel().rows} />
        </Table>
      </Table.ScrollContainer>
      {pagination && (
        <BasicTablePagination
          pages={pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      )}
    </div>
  );
}
