export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  items?: T[];
  pageIndex: number = 1;
  pageSize: number = 5;
  TotalCount: number = 0;
  PagesCount: number = 1;
  HasPreviousPage: boolean = false;
  HasNextPage: boolean = false;
}
