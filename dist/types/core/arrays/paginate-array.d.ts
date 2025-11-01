export interface Paginated<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export default function paginateArray<T>(items: T[], opts?: {
    page?: number;
    pageSize?: number;
    zeroBased?: boolean;
}): Paginated<T>;
