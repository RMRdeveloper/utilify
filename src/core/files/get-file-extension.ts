import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";

/**
 * Extracts the file extension from a filename or file path.
 * Works in both Node.js and browser environments.
 *
 * @param {string} filename - The filename or file path to extract the extension from
 * @returns {string} - The file extension (without the dot), or empty string if no extension
 * @throws {UtilifyException} - If the extension cannot be extracted
 *
 * @example
 * getFileExtension("document.pdf") // "pdf"
 * getFileExtension("image.png") // "png"
 * getFileExtension("/path/to/file.txt") // "txt"
 * getFileExtension("archive.tar.gz") // "gz"
 * getFileExtension("noextension") // ""
 */
const getFileExtension = (filename: string): string => {
  return safeRun(() => {
    try {
      if (!filename || typeof filename !== "string") {
        return "";
      }

      // Remove any query parameters or hash fragments (for URLs)
      const cleanFilename = filename.split("?")[0].split("#")[0];

      // Get the last part of the path (filename only)
      const parts = cleanFilename.split(/[/\\]/);
      const file = parts[parts.length - 1];

      // Find the last dot in the filename
      const lastDotIndex = file.lastIndexOf(".");

      // If no dot found, or dot is at the start (hidden file), return empty string
      if (lastDotIndex === -1 || lastDotIndex === 0) {
        return "";
      }

      // Return the extension without the dot
      return file.substring(lastDotIndex + 1).toLowerCase();
    } catch (error) {
      throw new UtilifyException(
        "getFileExtension",
        "Failed to extract file extension.",
      );
    }
  }, "");
};

export default getFileExtension;
