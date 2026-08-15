export interface Page<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface Pageable {
  page: number;
  size: number;
}

export interface MasterFilters {
  search: string;
  status: string | undefined;
  state: string | undefined;
}
