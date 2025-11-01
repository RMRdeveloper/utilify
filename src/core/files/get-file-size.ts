import UtilifyException from "../exception-handler";

/**
 * Represents supported file size units
 */
export type FileSizeUnit = "B" | "KB" | "MB" | "GB" | "TB";

/**
 * Union type for objects that can provide file size information
 */
export type FileLike = File | Blob | Buffer | { size: number };

interface UnitConfig {
  divisor: number;
  label: string;
}

const UNITS: Record<FileSizeUnit, UnitConfig> = {
  B: { divisor: 1, label: "B" },
  KB: { divisor: 1024, label: "KB" },
  MB: { divisor: 1024 ** 2, label: "MB" },
  GB: { divisor: 1024 ** 3, label: "GB" },
  TB: { divisor: 1024 ** 4, label: "TB" },
};

function extractSize(input: FileLike): number {
  if (
    input instanceof Blob ||
    (typeof File !== "undefined" && input instanceof File)
  ) {
    return input.size;
  }

  if (typeof Buffer !== "undefined" && Buffer.isBuffer(input)) {
    return input.length;
  }

  if (typeof input === "object" && input !== null && "size" in input) {
    const size = input.size;
    if (typeof size === "number" && isFinite(size) && size >= 0) {
      return size;
    }
  }

  throw new UtilifyException(
    "getFileSize",
    "Invalid input: expected File, Blob, Buffer, or object with valid numeric 'size' property",
  );
}

function validateUnit(unit: string): asserts unit is FileSizeUnit {
  if (!Object.keys(UNITS).includes(unit)) {
    throw new UtilifyException(
      "getFileSize",
      `Invalid unit '${unit}': must be one of ${Object.keys(UNITS).join(", ")}`,
    );
  }
}

/**
 * Formats a file size from bytes to a human-readable format with the specified unit.
 * Works in both Node.js and browser environments.
 *
 * @param input - The file object (File, Blob, Buffer) or object with size property
 * @param unit - The unit to format the size in ("B", "KB", "MB", "GB", "TB")
 * @returns The formatted file size with unit
 * @throws UtilifyException - If the size cannot be extracted or parameters are invalid
 *
 * @example
 * // Browser - File input
 * const file = new File(["content"], "example.txt");
 * getFileSize(file, "KB") // "0.00 KB"
 *
 * // Node.js - Buffer
 * const buffer = Buffer.from("content");
 * getFileSize(buffer, "B") // "7 B"
 *
 * // Generic object with size
 * getFileSize({ size: 1024 }, "KB") // "1.00 KB"
 */
const getFileSize = (input: FileLike, unit: FileSizeUnit): string => {
  validateUnit(unit);

  const bytes = extractSize(input);

  const { divisor, label } = UNITS[unit];
  const converted = bytes / divisor;

  const formatted = converted.toFixed(2);

  return `${formatted} ${label}`;
};

export default getFileSize;
