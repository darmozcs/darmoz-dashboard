import type { TFunction } from "i18next";
import type { TableColumns } from "./useTableColumns";

export interface GenericTableProps<T extends object> {
  columns: TableColumns<T>[];
  data: T[];
  isLoading?: boolean;
  error?: boolean;
  select?: boolean;
  onSelect?: (item: T | T[]) => void;
  selectedRows?: T[];
  pagination?: boolean;
  pages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (items: number) => void;
  maxHeight?: string | number;
  t?: TFunction;
}
