const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
      sourcemap: false,
      exports: "named",
    },
    {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: false,
      exports: "named",
    },
    {
      file: "dist/index.min.js",
      format: "esm",
      sourcemap: false,
      exports: "named",
      plugins: [
        terser({
          compress: { pure_getters: true },
          format: { comments: false },
        }),
      ],
    },
    {
      file: "dist/index.min.cjs",
      format: "cjs",
      sourcemap: false,
      exports: "named",
      plugins: [
        terser({
          compress: { pure_getters: true },
          format: { comments: false },
        }),
      ],
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "./dist",
      rootDir: "./src",
      outputToFilesystem: true,
    }),
  ],
};
