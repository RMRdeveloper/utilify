const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");

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
        declaration: true,
        declarationMap: false,
      }),
      terser(),
    ],
  },
];
