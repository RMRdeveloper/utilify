import getFileExtension from "../../core/files/get-file-extension";

describe("getFileExtension", () => {
  describe("basic file extensions", () => {
    it("should extract common file extensions", () => {
      expect(getFileExtension("document.pdf")).toBe("pdf");
      expect(getFileExtension("image.png")).toBe("png");
      expect(getFileExtension("video.mp4")).toBe("mp4");
      expect(getFileExtension("audio.mp3")).toBe("mp3");
      expect(getFileExtension("archive.zip")).toBe("zip");
    });

    it("should extract text file extensions", () => {
      expect(getFileExtension("file.txt")).toBe("txt");
      expect(getFileExtension("data.json")).toBe("json");
      expect(getFileExtension("config.xml")).toBe("xml");
      expect(getFileExtension("style.css")).toBe("css");
      expect(getFileExtension("script.js")).toBe("js");
    });

    it("should extract code file extensions", () => {
      expect(getFileExtension("app.ts")).toBe("ts");
      expect(getFileExtension("component.tsx")).toBe("tsx");
      expect(getFileExtension("component.jsx")).toBe("jsx");
      expect(getFileExtension("script.py")).toBe("py");
      expect(getFileExtension("program.java")).toBe("java");
    });
  });

  describe("file paths", () => {
    it("should extract extension from Unix paths", () => {
      expect(getFileExtension("/path/to/file.txt")).toBe("txt");
      expect(getFileExtension("/home/user/document.pdf")).toBe("pdf");
      expect(getFileExtension("./relative/path/image.png")).toBe("png");
      expect(getFileExtension("../parent/file.js")).toBe("js");
    });

    it("should extract extension from Windows paths", () => {
      expect(getFileExtension("C:\\Users\\file.txt")).toBe("txt");
      expect(getFileExtension("D:\\Documents\\report.docx")).toBe("docx");
      expect(getFileExtension("\\\\server\\share\\file.pdf")).toBe("pdf");
    });

    it("should extract extension from mixed path separators", () => {
      expect(getFileExtension("C:/Users/file.txt")).toBe("txt");
      expect(getFileExtension("/path\\to/file.pdf")).toBe("pdf");
    });

    it("should handle deep nested paths", () => {
      expect(getFileExtension("/a/b/c/d/e/f/file.txt")).toBe("txt");
      expect(getFileExtension("C:\\a\\b\\c\\d\\e\\file.pdf")).toBe("pdf");
    });
  });

  describe("URLs and query parameters", () => {
    it("should extract extension from URLs", () => {
      expect(getFileExtension("https://example.com/file.pdf")).toBe("pdf");
      expect(getFileExtension("http://site.com/image.png")).toBe("png");
      expect(getFileExtension("ftp://server.com/data.json")).toBe("json");
    });

    it("should ignore query parameters", () => {
      expect(getFileExtension("file.pdf?version=1")).toBe("pdf");
      expect(getFileExtension("image.png?width=100&height=200")).toBe("png");
      expect(
        getFileExtension("https://example.com/file.txt?download=true"),
      ).toBe("txt");
    });

    it("should ignore hash fragments", () => {
      expect(getFileExtension("file.pdf#page=1")).toBe("pdf");
      expect(getFileExtension("document.html#section")).toBe("html");
      expect(getFileExtension("https://example.com/file.js#top")).toBe("js");
    });

    it("should handle both query and hash", () => {
      expect(getFileExtension("file.pdf?v=1#page=2")).toBe("pdf");
      expect(
        getFileExtension("https://example.com/file.txt?id=123#section"),
      ).toBe("txt");
    });
  });

  describe("multiple dots in filename", () => {
    it("should return the last extension for compound extensions", () => {
      expect(getFileExtension("archive.tar.gz")).toBe("gz");
      expect(getFileExtension("backup.sql.bak")).toBe("bak");
      expect(getFileExtension("file.min.js")).toBe("js");
    });

    it("should handle multiple dots in path", () => {
      expect(getFileExtension("/path.with.dots/file.txt")).toBe("txt");
      expect(getFileExtension("C:\\folder.name\\file.pdf")).toBe("pdf");
    });

    it("should handle version numbers in filename", () => {
      expect(getFileExtension("app.v1.2.3.js")).toBe("js");
      expect(getFileExtension("library-2.0.1.min.js")).toBe("js");
    });
  });

  describe("files without extensions", () => {
    it("should return empty string for files without extension", () => {
      expect(getFileExtension("README")).toBe("");
      expect(getFileExtension("Makefile")).toBe("");
      expect(getFileExtension("LICENSE")).toBe("");
      expect(getFileExtension("Dockerfile")).toBe("");
    });

    it("should return empty string for paths without extension", () => {
      expect(getFileExtension("/path/to/file")).toBe("");
      expect(getFileExtension("C:\\Users\\document")).toBe("");
    });
  });

  describe("hidden files", () => {
    it("should return empty string for hidden files without extension", () => {
      expect(getFileExtension(".gitignore")).toBe("");
      expect(getFileExtension(".env")).toBe("");
      expect(getFileExtension(".htaccess")).toBe("");
    });

    it("should extract extension from hidden files with extension", () => {
      expect(getFileExtension(".config.json")).toBe("json");
      expect(getFileExtension(".eslintrc.js")).toBe("js");
      expect(getFileExtension(".prettierrc.yaml")).toBe("yaml");
    });
  });

  describe("case handling", () => {
    it("should convert extension to lowercase", () => {
      expect(getFileExtension("FILE.PDF")).toBe("pdf");
      expect(getFileExtension("IMAGE.PNG")).toBe("png");
      expect(getFileExtension("Document.TXT")).toBe("txt");
    });

    it("should handle mixed case extensions", () => {
      expect(getFileExtension("file.PdF")).toBe("pdf");
      expect(getFileExtension("image.PnG")).toBe("png");
    });
  });

  describe("edge cases", () => {
    it("should handle empty strings", () => {
      expect(getFileExtension("")).toBe("");
    });

    it("should handle strings with only dots", () => {
      expect(getFileExtension(".")).toBe("");
      expect(getFileExtension("..")).toBe("");
      expect(getFileExtension("...")).toBe("");
    });

    it("should handle filenames ending with dot", () => {
      expect(getFileExtension("file.")).toBe("");
      expect(getFileExtension("document.txt.")).toBe("");
    });

    it("should handle very long extensions", () => {
      expect(getFileExtension("file.verylongextension")).toBe(
        "verylongextension",
      );
    });

    it("should handle single character extensions", () => {
      expect(getFileExtension("file.c")).toBe("c");
      expect(getFileExtension("file.h")).toBe("h");
      expect(getFileExtension("file.r")).toBe("r");
    });

    it("should handle numeric extensions", () => {
      expect(getFileExtension("file.001")).toBe("001");
      expect(getFileExtension("backup.123")).toBe("123");
    });

    it("should handle extensions with numbers", () => {
      expect(getFileExtension("file.mp3")).toBe("mp3");
      expect(getFileExtension("video.mp4")).toBe("mp4");
      expect(getFileExtension("file.7z")).toBe("7z");
    });
  });

  describe("special characters", () => {
    it("should handle filenames with spaces", () => {
      expect(getFileExtension("my file.txt")).toBe("txt");
      expect(getFileExtension("document with spaces.pdf")).toBe("pdf");
    });

    it("should handle filenames with special characters", () => {
      expect(getFileExtension("file@2x.png")).toBe("png");
      expect(getFileExtension("document_v2.pdf")).toBe("pdf");
      expect(getFileExtension("file-name.txt")).toBe("txt");
    });

    it("should handle unicode filenames", () => {
      expect(getFileExtension("文档.txt")).toBe("txt");
      expect(getFileExtension("файл.pdf")).toBe("pdf");
      expect(getFileExtension("αρχείο.doc")).toBe("doc");
    });
  });

  describe("error handling", () => {
    it("should return empty string for non-string inputs", () => {
      expect(getFileExtension(null as any)).toBe("");
      expect(getFileExtension(undefined as any)).toBe("");
      expect(getFileExtension(123 as any)).toBe("");
      expect(getFileExtension({} as any)).toBe("");
      expect(getFileExtension([] as any)).toBe("");
    });
  });

  describe("real-world scenarios", () => {
    it("should handle common document formats", () => {
      expect(getFileExtension("report.docx")).toBe("docx");
      expect(getFileExtension("spreadsheet.xlsx")).toBe("xlsx");
      expect(getFileExtension("presentation.pptx")).toBe("pptx");
    });

    it("should handle common image formats", () => {
      expect(getFileExtension("photo.jpg")).toBe("jpg");
      expect(getFileExtension("photo.jpeg")).toBe("jpeg");
      expect(getFileExtension("graphic.svg")).toBe("svg");
      expect(getFileExtension("icon.ico")).toBe("ico");
      expect(getFileExtension("image.webp")).toBe("webp");
    });

    it("should handle common video formats", () => {
      expect(getFileExtension("movie.avi")).toBe("avi");
      expect(getFileExtension("clip.mov")).toBe("mov");
      expect(getFileExtension("video.mkv")).toBe("mkv");
      expect(getFileExtension("stream.m3u8")).toBe("m3u8");
    });

    it("should handle common archive formats", () => {
      expect(getFileExtension("archive.rar")).toBe("rar");
      expect(getFileExtension("package.tar")).toBe("tar");
      expect(getFileExtension("compressed.gz")).toBe("gz");
      expect(getFileExtension("bundle.bz2")).toBe("bz2");
    });

    it("should handle web files", () => {
      expect(getFileExtension("index.html")).toBe("html");
      expect(getFileExtension("page.htm")).toBe("htm");
      expect(getFileExtension("template.php")).toBe("php");
      expect(getFileExtension("api.aspx")).toBe("aspx");
    });
  });
});
