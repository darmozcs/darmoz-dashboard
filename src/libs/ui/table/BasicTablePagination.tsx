import { Pagination, Select } from "@mantine/core";

const ITEMS_PER_PAGE_OPTIONS = ["10", "15", "20"];

interface BasicTablePaginationProps {
  pages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (items: number) => void;
}

export const BasicTablePagination = ({
  pages,
  currentPage,
  onPageChange,
  itemsPerPage = 10,
  onItemsPerPageChange,
}: BasicTablePaginationProps) => (
  <div className="flex flex-col items-stretch justify-end gap-2 p-3 sm:flex-row sm:items-center">
    <Pagination
      total={pages ?? 1}
      value={Number(currentPage)}
      onChange={(page) => onPageChange?.(page)}
    />
    <Select
      value={String(itemsPerPage)}
      onChange={(value) => {
        if (value) onItemsPerPageChange?.(Number(value));
      }}
      data={ITEMS_PER_PAGE_OPTIONS}
      className="w-full sm:w-24"
    />
  </div>
);
