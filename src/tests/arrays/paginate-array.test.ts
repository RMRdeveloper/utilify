import paginateArray, {
  type Paginated,
} from "../../core/arrays/paginate-array";

describe("paginateArray", () => {
  const testData = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

  it("should paginate with default options (page 1, pageSize 10)", () => {
    const result: Paginated<{ id: number; name: string }> =
      paginateArray(testData);

    expect(result.data).toHaveLength(10);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(3);
    expect(result.totalItems).toBe(25);
    expect(result.pageSize).toBe(10);
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPreviousPage).toBe(false);
  });

  it("should paginate with custom pageSize", () => {
    const result = paginateArray(testData, { pageSize: 5 });

    expect(result.data).toHaveLength(5);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(5);
    expect(result.pageSize).toBe(5);
  });

  it("should paginate to second page", () => {
    const result = paginateArray(testData, { page: 2 });

    expect(result.data).toHaveLength(10);
    expect(result.currentPage).toBe(2);
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPreviousPage).toBe(true);
  });

  it("should handle last page correctly", () => {
    const result = paginateArray(testData, { page: 3 });

    expect(result.data).toHaveLength(5);
    expect(result.currentPage).toBe(3);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(true);
  });

  it("should handle zero-based pagination", () => {
    const result = paginateArray(testData, { page: 0, zeroBased: true });

    expect(result.data).toHaveLength(10);
    expect(result.currentPage).toBe(0);
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPreviousPage).toBe(false);
  });

  it("should handle zero-based pagination on last page", () => {
    const result = paginateArray(testData, { page: 2, zeroBased: true });

    expect(result.data).toHaveLength(5);
    expect(result.currentPage).toBe(2);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(true);
  });

  it("should handle out-of-bounds page (1-based)", () => {
    const result = paginateArray(testData, { page: 10 });

    expect(result.currentPage).toBe(3);
    expect(result.data).toHaveLength(5);
  });

  it("should handle out-of-bounds page (zero-based)", () => {
    const result = paginateArray(testData, { page: 10, zeroBased: true });

    expect(result.currentPage).toBe(2);
    expect(result.data).toHaveLength(5);
  });

  it("should handle negative page (1-based)", () => {
    const result = paginateArray(testData, { page: -1 });

    expect(result.currentPage).toBe(1);
    expect(result.data).toHaveLength(10);
  });

  it("should handle negative page (zero-based)", () => {
    const result = paginateArray(testData, { page: -1, zeroBased: true });

    expect(result.currentPage).toBe(0);
    expect(result.data).toHaveLength(10);
  });

  it("should handle empty array", () => {
    const result = paginateArray([]);

    expect(result.data).toHaveLength(0);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(0);
    expect(result.totalItems).toBe(0);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(false);
  });

  it("should handle array smaller than pageSize", () => {
    const smallData = testData.slice(0, 3);
    const result = paginateArray(smallData, { pageSize: 10 });

    expect(result.data).toHaveLength(3);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(1);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(false);
  });
});
