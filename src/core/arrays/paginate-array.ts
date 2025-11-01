export interface Paginated<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginates an array of items with configurable options.
 *
 * @template T - The type of items in the array
 * @param items - The array of items to paginate
 * @param opts - Optional pagination configuration
 * @param opts.page - The page number (1-based by default, 0-based if zeroBased is true)
 * @param opts.pageSize - Number of items per page (default: 10)
 * @param opts.zeroBased - Whether to use 0-based page numbering (default: false)
 * @returns The paginated result with data and metadata
 */
export default function paginateArray<T>(
  items: T[],
  opts?: {
    page?: number;
    pageSize?: number;
    zeroBased?: boolean;
  },
): Paginated<T> {
  const pageSize = opts?.pageSize ?? 10;
  const zeroBased = opts?.zeroBased ?? false;
  const page = opts?.page ?? (zeroBased ? 0 : 1);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Adjust page if out of bounds
  let currentPage = page;
  if (zeroBased) {
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= totalPages) currentPage = Math.max(0, totalPages - 1);
  } else {
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = Math.max(1, totalPages);
  }

  const startIndex = (currentPage - (zeroBased ? 0 : 1)) * pageSize;
  const data = items.slice(startIndex, startIndex + pageSize);

  const hasNextPage = zeroBased
    ? currentPage < totalPages - 1
    : currentPage < totalPages;
  const hasPreviousPage = zeroBased ? currentPage > 0 : currentPage > 1;

  return {
    data,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    hasNextPage,
    hasPreviousPage,
  };
}
