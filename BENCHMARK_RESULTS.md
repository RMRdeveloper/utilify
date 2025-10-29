# Performance Benchmarks

**Benchmark environment:** Node.js v18.20.8, AMD Ryzen 5 7535HS with Radeon Graphics , win32 x64, 31GB RAM

| Utility                 | Lodash (ops/sec) | Ramda (ops/sec) | UtilifyCore (ops/sec) |
| ----------------------- | ---------------- | --------------- | --------------------- |
| validation/is-empty     | 1,079,516        | 110,435         | 15,516,865            |
| validation/is-json      | —                | —               | 64,042                |
| validation/is-object    | 21,780,183       | 927,625         | 23,421,785            |
| string/capitalize       | 3,132,752        | —               | 5,757,178             |
| string/trim             | 2,110,139        | 1,219,481       | 11,125,013            |
| string/to-kebab-case    | 356,027          | 286,981         | 456,945               |
| string/to-snake-case    | 502,739          | 285,128         | 665,895               |
| array/paginate          | —                | —               | —                     |
| file/get-file-extension | —                | —               | —                     |
| file/get-file-size      | —                | —               | —                     |
| execution/debounce      | —                | —               | —                     |
| runner/flow             | —                | —               | —                     |
| runner/safe-run         | —                | —               | 202,955,815           |
| runner/safe-run-async   | —                | —               | 2,240,795             |

## Summary

- 🥇 Fastest library: UtilifyCore
- 🧩 Fastest function: runner/safe-run (202,955,815 ops/sec)
- Note: Performance comparison between Utilify, Lodash and Ramda on common operations.

_Generated on: 2025-10-28T23:41:44.955Z_
