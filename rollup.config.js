const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");
const dts = require("rollup-plugin-dts").default;

const typescriptConfig = {
  tsconfig: "./tsconfig.json",
  declaration: true,
  declarationDir: "./dist/types",
  rootDir: "./src",
  outputToFilesystem: true,
};

const terserConfig = {
  compress: {
    pure_getters: true,
    unsafe: true,
  },
  format: {
    comments: false,
  },
};

module.exports = [
  {
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
        footer: "module.exports = exports.default;",
      },
    ],
    plugins: [typescript(typescriptConfig)],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.min.js",
        format: "esm",
        sourcemap: false,
        exports: "named",
      },
      {
        file: "dist/index.min.cjs",
        format: "cjs",
        sourcemap: false,
        exports: "named",
        footer: "module.exports = exports.default;",
      },
    ],
    plugins: [
      typescript({
        ...typescriptConfig,
        declaration: false,
      }),
      terser(terserConfig),
    ],
  },
  {
    input: "dist/types/index.d.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];
