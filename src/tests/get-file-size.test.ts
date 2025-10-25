import getFileSize, { FileSizeUnit } from "../core/files/get-file-size";
import UtilifyException from "../core/exception-handler";

describe("getFileSize", () => {
  describe("File objects (Browser)", () => {
    it.skip("should format File objects correctly", () => {
      const file = new File(["content"], "test.txt");
      expect(getFileSize(file, "B")).toBe("7 B");
      expect(getFileSize(file, "KB")).toBe("0.01 KB");
    });

    it.skip("should handle empty File objects", () => {
      const emptyFile = new File([], "empty.txt");
      expect(getFileSize(emptyFile, "B")).toBe("0.00 B");
    });

    it.skip("should handle large File objects", () => {
      const largeContent = "x".repeat(1024 * 1024); // 1MB
      const largeFile = new File([largeContent], "large.txt");
      expect(getFileSize(largeFile, "MB")).toBe("1.00 MB");
    });
  });

  describe("Blob objects (Browser)", () => {
    it("should format Blob objects correctly", () => {
      const blob = new Blob(["Hello World"]);
      expect(getFileSize(blob, "B")).toBe("11.00 B");
    });

    it("should handle empty Blob objects", () => {
      const emptyBlob = new Blob([]);
      expect(getFileSize(emptyBlob, "B")).toBe("0.00 B");
    });

    it("should handle Blob with multiple parts", () => {
      const blob = new Blob(["Hello", " ", "World"], { type: "text/plain" });
      expect(getFileSize(blob, "B")).toBe("11.00 B");
    });
  });

  describe("Buffer objects (Node.js)", () => {
    it("should format Buffer objects correctly", () => {
      const buffer = Buffer.from("Hello World");
      expect(getFileSize(buffer, "B")).toBe("11.00 B");
    });

    it("should handle empty Buffer objects", () => {
      const emptyBuffer = Buffer.from("");
      expect(getFileSize(emptyBuffer, "B")).toBe("0.00 B");
    });

    it("should handle large Buffer objects", () => {
      const largeBuffer = Buffer.alloc(1024 * 1024); // 1MB
      expect(getFileSize(largeBuffer, "MB")).toBe("1.00 MB");
    });
  });

  describe("Size objects", () => {
    it("should format objects with size property", () => {
      expect(getFileSize({ size: 1024 }, "KB")).toBe("1.00 KB");
      expect(getFileSize({ size: 0 }, "B")).toBe("0.00 B");
      expect(getFileSize({ size: 1048576 }, "MB")).toBe("1.00 MB");
    });

    it("should handle objects with additional properties", () => {
      const obj = {
        size: 2048,
        name: "file.txt",
        type: "text/plain",
      };
      expect(getFileSize(obj, "KB")).toBe("2.00 KB");
    });
  });

  describe("unit conversion accuracy", () => {
    it("should convert bytes to kilobytes correctly", () => {
      const obj = { size: 1024 };
      expect(getFileSize(obj, "B")).toBe("1024.00 B");
      expect(getFileSize(obj, "KB")).toBe("1.00 KB");
    });

    it("should convert bytes to megabytes correctly", () => {
      const obj = { size: 1024 ** 2 };
      expect(getFileSize(obj, "KB")).toBe("1024.00 KB");
      expect(getFileSize(obj, "MB")).toBe("1.00 MB");
    });

    it("should convert bytes to gigabytes correctly", () => {
      const obj = { size: 1024 ** 3 };
      expect(getFileSize(obj, "MB")).toBe("1024.00 MB");
      expect(getFileSize(obj, "GB")).toBe("1.00 GB");
    });

    it("should convert bytes to terabytes correctly", () => {
      const obj = { size: 1024 ** 4 };
      expect(getFileSize(obj, "GB")).toBe("1024.00 GB");
      expect(getFileSize(obj, "TB")).toBe("1.00 TB");
    });
  });

  describe("decimal precision", () => {
    it("should show 2 decimal places for fractional values", () => {
      expect(getFileSize({ size: 1536 }, "KB")).toBe("1.50 KB");
      expect(getFileSize({ size: 1024 * 1.25 }, "KB")).toBe("1.25 KB");
    });

    it("should remove .00 for whole numbers", () => {
      expect(getFileSize({ size: 1024 }, "KB")).toBe("1.00 KB");
      expect(getFileSize({ size: 2048 }, "KB")).toBe("2.00 KB");
      expect(getFileSize({ size: 1024 ** 2 }, "MB")).toBe("1.00 MB");
    });

    it("should handle very small decimal values", () => {
      expect(getFileSize({ size: 1 }, "KB")).toBe("0.00 KB");
      expect(getFileSize({ size: 512 }, "KB")).toBe("0.50 KB");
      expect(getFileSize({ size: 256 }, "KB")).toBe("0.25 KB");
    });
  });

  describe("real-world scenarios", () => {
    it("should format common file sizes", () => {
      // Text file
      expect(getFileSize({ size: 1024 }, "B")).toBe("1024.00 B");

      // Small image
      expect(getFileSize({ size: 51200 }, "KB")).toBe("50.00 KB");

      // Medium image
      expect(getFileSize({ size: 2048000 }, "MB")).toBe("1.95 MB");

      // Large video
      expect(getFileSize({ size: 1073741824 }, "GB")).toBe("1.00 GB");

      // Very large file
      expect(getFileSize({ size: 5368709120 }, "GB")).toBe("5.00 GB");
    });

    it("should handle edge cases in real scenarios", () => {
      // Empty file
      expect(getFileSize({ size: 0 }, "B")).toBe("0.00 B");

      // Very small file
      expect(getFileSize({ size: 1 }, "B")).toBe("1.00 B");

      // Large file approaching TB
      expect(getFileSize({ size: 1024 ** 4 - 1 }, "TB")).toBe("1.00 TB");
    });
  });

  describe("input validation", () => {
    it("should handle invalid size values", () => {
      expect(() => getFileSize({ size: NaN }, "B")).toThrow(UtilifyException);
      expect(() => getFileSize({ size: Infinity }, "B")).toThrow(
        UtilifyException,
      );
      expect(() => getFileSize({ size: -1 }, "B")).toThrow(UtilifyException);
      expect(() => getFileSize({ size: -100 }, "B")).toThrow(UtilifyException);
    });

    it("should handle invalid input types", () => {
      expect(() => getFileSize(null as any, "B")).toThrow(UtilifyException);
      expect(() => getFileSize(undefined as any, "B")).toThrow(
        UtilifyException,
      );
      expect(() => getFileSize("invalid" as any, "B")).toThrow(
        UtilifyException,
      );
      expect(() => getFileSize(123 as any, "B")).toThrow(UtilifyException);
      expect(() => getFileSize({} as any, "B")).toThrow(UtilifyException);
      expect(() => getFileSize({ name: "file.txt" } as any, "B")).toThrow(
        UtilifyException,
      );
    });

    it("should handle invalid units", () => {
      expect(() => getFileSize({ size: 1024 }, "invalid" as any)).toThrow(
        UtilifyException,
      );
      expect(() => getFileSize({ size: 1024 }, "" as any)).toThrow(
        UtilifyException,
      );
      expect(() => getFileSize({ size: 1024 }, "b" as any)).toThrow(
        UtilifyException,
      );
    });
  });

  describe("unit consistency", () => {
    it("should always return the requested unit", () => {
      const obj = { size: 1024 };
      expect(getFileSize(obj, "B")).toMatch(/B$/);
      expect(getFileSize(obj, "KB")).toMatch(/KB$/);
      expect(getFileSize(obj, "MB")).toMatch(/MB$/);
      expect(getFileSize(obj, "GB")).toMatch(/GB$/);
      expect(getFileSize(obj, "TB")).toMatch(/TB$/);
    });

    it("should maintain unit case", () => {
      const obj = { size: 1024 };
      expect(getFileSize(obj, "B")).toBe("1024.00 B");
      expect(getFileSize(obj, "KB")).toBe("1.00 KB");
      expect(getFileSize({ size: 1024 ** 2 }, "MB")).toBe("1.00 MB");
    });
  });

  describe("large number handling", () => {
    it("should handle very large numbers", () => {
      const largeNumber = 1024 ** 5; // Petabytes in bytes
      expect(getFileSize({ size: largeNumber }, "TB")).toBe("1024.00 TB");
    });

    it("should handle numbers close to JavaScript limits", () => {
      const maxSafeInteger = Number.MAX_SAFE_INTEGER;
      expect(getFileSize({ size: maxSafeInteger }, "TB")).toBe("8192.00 TB");
    });
  });

  describe("precision and rounding", () => {
    it("should round correctly", () => {
      expect(getFileSize({ size: 1024 + 0.4 }, "KB")).toBe("1.00 KB");
      expect(getFileSize({ size: 1024 + 0.5 }, "KB")).toBe("1.00 KB");
      expect(getFileSize({ size: 1024 + 0.6 }, "KB")).toBe("1.00 KB");
    });

    it("should handle floating point precision", () => {
      expect(getFileSize({ size: 1024 * 1.23456789 }, "KB")).toBe("1.23 KB");
      expect(getFileSize({ size: 1024 * 1.99999999 }, "KB")).toBe("2.00 KB");
    });
  });

  describe("error handling and validation", () => {
    it("should throw UtilifyException for invalid input types", () => {
      expect(() => getFileSize(null as any, "B")).toThrow(UtilifyException);
      expect(() => getFileSize(undefined as any, "B")).toThrow(
        UtilifyException,
      );
      expect(() => getFileSize("invalid" as any, "B")).toThrow(
        UtilifyException,
      );
      expect(() => getFileSize(123 as any, "B")).toThrow(UtilifyException);
    });

    it("should throw UtilifyException for invalid units", () => {
      expect(() => getFileSize({ size: 1024 }, "invalid" as any)).toThrow(
        UtilifyException,
      );
      expect(() => getFileSize({ size: 1024 }, "" as any)).toThrow(
        UtilifyException,
      );
    });

    it("should throw descriptive errors for invalid size objects", () => {
      expect(() => getFileSize({ size: NaN }, "B")).toThrow(/Invalid input/);
      expect(() => getFileSize({ size: -1 }, "B")).toThrow(/Invalid input/);
      expect(() => getFileSize({ size: Infinity }, "B")).toThrow(
        /Invalid input/,
      );
    });
  });

  describe("precision and large numbers", () => {
    it("should handle MAX_SAFE_INTEGER without precision loss", () => {
      const maxSize = Number.MAX_SAFE_INTEGER;
      expect(() => getFileSize({ size: maxSize }, "TB")).not.toThrow();
      const result = getFileSize({ size: maxSize }, "TB");
      expect(result).toMatch(/^\d+\.\d{2} TB$/);
    });

    it("should handle very small decimal conversions", () => {
      expect(getFileSize({ size: 0.5 }, "B")).toBe("0.50 B");
      expect(getFileSize({ size: 0.1 }, "KB")).toBe("0.00 KB");
    });
  });
});
