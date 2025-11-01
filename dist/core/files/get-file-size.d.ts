export type FileSizeUnit = "B" | "KB" | "MB" | "GB" | "TB";
export type FileLike = File | Blob | Buffer | {
    size: number;
};
declare const getFileSize: (input: FileLike, unit: FileSizeUnit) => string;
export default getFileSize;
