const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");
const dts = require("rollup-plugin-dts");

module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "esm",
        sourcemap: false,
      },
      {
        file: "dist/index.cjs",
        format: "cjs",
        sourcemap: false,
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        declarationMap: false,
      }),
      terser(),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts.default()],
  },
];
