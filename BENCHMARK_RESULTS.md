# Performance Benchmarks

**Benchmark environment:** Node.js v18.20.8, AMD Ryzen 5 7535HS with Radeon Graphics , win32 x64, 31GB RAM

| Utility                 | Lodash (ops/sec) | Ramda (ops/sec) | UtilifyCore (ops/sec) |
| ----------------------- | ---------------- | --------------- | --------------------- |
| validation/is-empty     | 1,456,755        | 131,240         | 15,990,320            |
| validation/is-json      | —                | —               | 60,684                |
| validation/is-object    | 20,942,535       | 889,130         | 23,059,301            |
| string/capitalize       | 2,287,187        | —               | 5,388,119             |
| string/trim             | 2,061,515        | 1,164,910       | 10,949,719            |
| string/to-kebab-case    | 328,432          | 189,756         | 449,931               |
| string/to-snake-case    | 349,352          | 201,256         | 455,748               |
| string/remove-accents   | 322,848          | —               | 502,239               |
| array/paginate          | —                | —               | —                     |
| file/get-file-extension | —                | —               | —                     |
| file/get-file-size      | —                | —               | —                     |
| execution/debounce      | —                | —               | —                     |
| runner/flow             | —                | —               | —                     |
| runner/safe-run         | —                | —               | 135,160,765           |
| runner/safe-run-async   | —                | —               | 1,848,563             |

## Summary

- 🥇 Fastest library: UtilifyCore
- 🧩 Fastest function: runner/safe-run (135,160,765 ops/sec)
- Note: Performance comparison between Utilify, Lodash and Ramda on common operations.

_Generated on: 2025-11-01T02:52:45.951Z_
