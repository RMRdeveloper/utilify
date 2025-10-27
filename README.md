# UtilifyCore

[![npm version](https://img.shields.io/npm/v/utilifycore.svg)](https://www.npmjs.com/package/utilifycore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25_statements-4CAF50)](https://github.com/RMRdeveloper/utilify)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25_lines-4CAF50)](https://github.com/RMRdeveloper/utilify)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25_functions-4CAF50)](https://github.com/RMRdeveloper/utilify)

A lightweight, type-safe utility library for JavaScript and TypeScript projects that provides essential validation, string transformation, file operations, and function utilities with **100% test coverage**.

## ✨ Features

- **🏆 100% Test Coverage**: Complete statement, line, and function coverage
- **🔒 Type-safe**: Written in TypeScript with full type definitions and runtime validation
- **⚡ High Performance**: Optimized for speed with minimal overhead
- **📦 Lightweight**: Small bundle size (~9.0KB packaged, 32.1KB unpacked)
- **🔄 ESM & CommonJS**: Supports both modern and legacy module systems
- **🚫 Zero Dependencies**: Pure JavaScript/TypeScript implementation
- **🌍 Cross-Environment**: Works in Node.js, browsers, and other JavaScript environments
- **🛡️ Error Safety**: Comprehensive input validation with descriptive error messages
- **🔧 Extensible Architecture**: Built with SOLID principles for easy extension and customization

## 📦 Installation

### Prerequisites

- **Node.js**: v14.0.0 or higher
- **TypeScript**: v4.0.0 or higher (for TypeScript projects)

### Install via npm

```bash
npm install utilifycore
```

### Install via yarn

```bash
yarn add utilifycore
```

### Install via pnpm

```bash
pnpm add utilifycore
```

## 🚀 Usage

### ES6 Import (Recommended)

```typescript
import Utilify from "utilifycore";

// Validation functions
console.log(Utilify.isJson('{"name": "John"}')); // true
console.log(Utilify.isObject({})); // true
console.log(Utilify.isEmpty(null)); // true

// String transformations
console.log(Utilify.capitalize("hello world")); // "Hello world"
console.log(Utilify.toKebabCase("camelCaseString")); // "camel-case-string"
console.log(Utilify.toSnakeCase("camelCaseString")); // "camel_case_string"
console.log(Utilify.trim("  hello world  ")); // "hello world"

// File utilities
console.log(Utilify.getFileExtension("document.pdf")); // "pdf"
console.log(Utilify.getFileSize(new File(["content"], "test.txt"), "KB")); // "0.00 KB"

// Function utilities
const debouncedFn = Utilify.debounce(() => console.log("Called!"), 300);
debouncedFn(); // Will log after 300ms

// Function composition
const processNumber = Utilify.flow(
  (n: number) => n + 1,
  (n: number) => n * 2,
  (n: number) => n / 2,
);
console.log(processNumber(3)); // ((3 + 1) * 2) / 2 = 4

// Safe execution
const result = Utilify.safeRun(() => JSON.parse('{"x":1}'));
// result: { success: true, result: { x: 1 } }

const asyncResult = await Utilify.safeRunAsync(async () =>
  fetch("https://example.com"),
);
// asyncResult: { success: true, result: Response }
```

### Named Imports

```typescript
import {
  isJson,
  isObject,
  isEmpty,
  capitalize,
  toKebabCase,
  toSnakeCase,
  trim,
  getFileExtension,
  getFileSize,
  debounce,
  flow,
  safeRun,
  safeRunAsync,
  paginateArray,
  createUtils,
} from "utilifycore";

// Use individual functions directly
console.log(isJson('{"valid": true}')); // true
console.log(capitalize("hello")); // "Hello"
console.log(toKebabCase("PascalCase")); // "pascal-case"

// Array pagination
const items = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));
const paginated = paginateArray(items, { page: 2, pageSize: 5 });
console.log(paginated.currentPage); // 2
console.log(paginated.data.length); // 5

// Extend utilities with custom functions
const extendedUtils = createUtils(
  { isJson, capitalize },
  { customValidator: (value: any) => value !== null },
);
```

### CommonJS Require

```javascript
const Utilify = require("utilifycore");

console.log(Utilify.isJson('{"name": "John"}')); // true
console.log(Utilify.capitalize("hello world")); // "Hello world"
```

### Browser Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import Utilify from "https://esm.sh/utilifycore";

      console.log(Utilify.capitalize("hello world")); // "Hello world"
      console.log(Utilify.isJson('{"test": true}')); // true
    </script>
  </head>
  <body>
    <h1>UtilifyCore Browser Example</h1>
  </body>
</html>
```

## 📚 API Reference

### Validation Functions

#### `Utilify.isJson(value: unknown): boolean`

Checks if the provided value is a valid JSON string.

**Parameters:**

- `value`: The value to check

**Returns:** `boolean` - True if the value is a valid JSON string

**Throws:** `UtilifyException` - If the input is not a string

**Example:**

```typescript
console.log(Utilify.isJson('{"name": "John"}')); // true
console.log(Utilify.isJson("invalid json")); // false
console.log(Utilify.isJson(123)); // throws UtilifyException
```

#### `Utilify.isObject(value: unknown): boolean`

Checks if the provided value is an object (but not an array).

**Parameters:**

- `value`: The value to check

**Returns:** `boolean` - True if the value is a plain object

**Example:**

```typescript
console.log(Utilify.isObject({})); // true
console.log(Utilify.isObject([])); // false
console.log(Utilify.isObject(null)); // false
```

#### `Utilify.isEmpty(value: unknown): boolean`

Checks if the provided value is empty (null, undefined, empty string, empty array, or empty object).

**Parameters:**

- `value`: The value to check

**Returns:** `boolean` - True if the value is empty

**Example:**

```typescript
console.log(Utilify.isEmpty(null)); // true
console.log(Utilify.isEmpty("")); // true
console.log(Utilify.isEmpty([])); // true
console.log(Utilify.isEmpty({})); // true
console.log(Utilify.isEmpty("hello")); // false
```

### String Functions

#### `Utilify.capitalize(value: string): string`

Capitalizes the first letter of a string.

**Parameters:**

- `value`: The string to capitalize

**Returns:** `string` - The capitalized string

**Throws:** `UtilifyException` - If the input is not a string

**Example:**

```typescript
console.log(Utilify.capitalize("hello world")); // "Hello world"
console.log(Utilify.capitalize("HELLO")); // "HELLO"
console.log(Utilify.capitalize("")); // ""
```

#### `Utilify.toKebabCase(value: string): string`

Converts a string to kebab-case (lowercase with hyphens).

**Parameters:**

- `value`: The string to convert

**Returns:** `string` - The kebab-case version

**Throws:** `UtilifyException` - If the input is not a string

**Example:**

```typescript
console.log(Utilify.toKebabCase("camelCaseString")); // "camel-case-string"
console.log(Utilify.toKebabCase("PascalCase")); // "pascal-case"
console.log(Utilify.toKebabCase("hello_world")); // "hello-world"
```

#### `Utilify.toSnakeCase(value: string): string`

Converts a string to snake_case (lowercase with underscores).

**Parameters:**

- `value`: The string to convert

**Returns:** `string` - The snake_case version

**Throws:** `UtilifyException` - If the input is not a string

**Example:**

```typescript
console.log(Utilify.toSnakeCase("camelCaseString")); // "camel_case_string"
console.log(Utilify.toSnakeCase("PascalCase")); // "pascal_case"
console.log(Utilify.toSnakeCase("hello-world")); // "hello_world"
```

#### `Utilify.trim(value: string): string`

Removes whitespace from both ends of a string.

**Parameters:**

- `value`: The string to trim

**Returns:** `string` - The trimmed string

**Throws:** `UtilifyException` - If the input is not a string

**Example:**

```typescript
console.log(Utilify.trim("  hello world  ")); // "hello world"
console.log(Utilify.trim("\t\nhello\n\t")); // "hello"
console.log(Utilify.trim("")); // ""
```

### File Utilities

#### `Utilify.getFileExtension(filename: string): string`

Extracts the file extension from a filename or file path. Works in both Node.js and browser environments.

**Parameters:**

- `filename`: The filename or file path to extract the extension from

**Returns:** `string` - The file extension (without the dot) in lowercase, or empty string if no extension

**Throws:** `UtilifyException` - If the input is not a string

**Example:**

```typescript
console.log(Utilify.getFileExtension("document.pdf")); // "pdf"
console.log(Utilify.getFileExtension("/path/to/file.txt")); // "txt"
console.log(Utilify.getFileExtension("C:\\Users\\image.png")); // "png"
console.log(Utilify.getFileExtension("archive.tar.gz")); // "gz"
console.log(Utilify.getFileExtension("https://example.com/file.pdf?v=1")); // "pdf"
console.log(Utilify.getFileExtension("README")); // ""
```

#### `Utilify.getFileSize(input: FileLike, unit: FileSizeUnit): string`

Formats a file size from various input types to a human-readable format with the specified unit. Works in both Node.js and browser environments.

**Parameters:**

- `input`: The file object (File, Blob, Buffer) or object with size property
- `unit`: The unit to format in ("B", "KB", "MB", "GB", "TB")

**Returns:** `string` - The formatted file size with unit (e.g., "1.50 MB")

**Throws:** `UtilifyException` - If the input is invalid or unit is unsupported

**Supported Input Types:**

- `File` (Browser)
- `Blob` (Browser)
- `Buffer` (Node.js)
- `{ size: number }` (Generic object with size property)

**Example:**

```typescript
// Browser - File input
const file = new File(["content"], "example.txt");
console.log(Utilify.getFileSize(file, "KB")); // "0.00 KB"

// Node.js - Buffer
const buffer = Buffer.from("content");
console.log(Utilify.getFileSize(buffer, "B")); // "7 B"

// Generic object
console.log(Utilify.getFileSize({ size: 1024 }, "KB")); // "1.00 KB"
console.log(Utilify.getFileSize({ size: 1048576 }, "MB")); // "1.00 MB"
console.log(Utilify.getFileSize({ size: 1500 }, "KB")); // "1.46 KB"
```

### Function Utilities

#### `Utilify.debounce<T extends (...args: any[]) => any>(fn: T, delay?: number): T`

Returns a debounced version of the provided function that delays invoking the function until after `delay` milliseconds have elapsed since the last time the debounced function was invoked.

**Type Parameters:**

- `T`: The function type to debounce

**Parameters:**

- `fn`: The function to debounce
- `delay`: (optional) The delay in milliseconds (default: 250)

**Returns:** `T` - The debounced function with the same signature as the input

**Throws:** `UtilifyException` - If fn is not a function or delay is invalid

**Example:**

```typescript
const debouncedSearch = Utilify.debounce((query: string) => {
  console.log("Searching for:", query);
}, 300);

debouncedSearch("hello"); // Will execute after 300ms
debouncedSearch("world"); // Resets timer, will execute after another 300ms
```

#### `Utilify.flow<T1, T2, T3, ..., TN>(f1: (input: T1) => T2, f2: (input: T2) => T3, ..., fn: (input: TN-1) => TN): (input: T1) => TN`

Composes multiple functions into a single pipeline, applying them sequentially from left to right. Each function receives the output of the previous function as its input.

**Parameters:**

- `f1, f2, ..., fn`: Two or more functions to compose (minimum 2, maximum 10)

**Returns:** A function that takes the initial input and applies all functions in sequence

**Throws:** `UtilifyException` - If fewer than 2 functions are provided or any argument is not a function

**Example:**

```typescript
// String processing pipeline
const processString = Utilify.flow(
  (s: string) => s.trim(),
  (s: string) => s.toUpperCase(),
  (s: string) => `PREFIX_${s}`,
);
console.log(processString("  hello world  ")); // "PREFIX_HELLO WORLD"

// Number processing pipeline
const calculate = Utilify.flow(
  (n: number) => n + 1,
  (n: number) => n * n,
  (n: number) => n / 2,
);
console.log(calculate(3)); // ((3 + 1)²) / 2 = 8

// Type transformation pipeline
const transform = Utilify.flow(
  (s: string) => s.length,
  (n: number) => n > 5,
  (b: boolean) => (b ? "long" : "short"),
);
console.log(transform("hello world")); // "long"
```

#### `Utilify.createUtils<TBase extends Record<string, any>, TExt extends Record<string, any>>(base: TBase, ext: Partial<TExt>, options?: { freezeBase?: boolean; freezeResult?: boolean }): TBase & TExt`

Creates an extended utility object by shallow merging a base object with extensions. Follows SOLID principles for extensible architecture.

**Type Parameters:**

- `TBase`: The base object type
- `TExt`: The extension object type

**Parameters:**

- `base`: The base object to extend
- `ext`: Partial extensions to merge into the base
- `options`: Optional configuration for freezing objects

**Returns:** `TBase & TExt` - The merged object with base and extensions

**Example:**

````typescript
import { createUtils, isJson, capitalize } from "utilifycore";
#### `Utilify.safeRun<T>(fn: () => T): SafeResult<T>`

Executes a synchronous function in a safe context, catching any errors and returning a structured result. This provides better error handling compared to traditional try-catch blocks.

**Type Parameters:**

- `T`: The return type of the function

**Parameters:**

- `fn`: The function to execute safely

**Returns:** `SafeResult<T>` - A structured result with success status and either result or error

**Throws:** `UtilifyException` - If fn is not a function

**Example:**

```typescript
// Successful execution
const success = Utilify.safeRun(() => JSON.parse('{"valid": true}'));
console.log(success); // { success: true, result: { valid: true } }

// Error handling
const failure = Utilify.safeRun(() => {
  throw new Error("Something went wrong");
});
console.log(failure); // { success: false, error: Error("Something went wrong") }

// Type-safe usage
if (success.success) {
  console.log(success.result); // TypeScript knows this is { valid: boolean }
} else {
  console.error(success.error); // TypeScript knows this is an Error
}
````

#### `Utilify.safeRunAsync<T>(fn: () => Promise<T>): Promise<SafeResult<T>>`

Executes an asynchronous function in a safe context, catching both synchronous errors and Promise rejections, returning a structured result.

**Type Parameters:**

- `T`: The resolved type of the Promise

**Parameters:**

- `fn`: The async function to execute safely

**Returns:** `Promise<SafeResult<T>>` - A Promise resolving to a structured result

**Throws:** `UtilifyException` - If fn is not a function

**Example:**

```typescript
// Successful async execution
const asyncSuccess = await Utilify.safeRunAsync(async () => {
  const response = await fetch("https://api.example.com/data");
  return response.json();
});

if (asyncSuccess.success) {
  console.log(asyncSuccess.result); // TypeScript knows the JSON structure
} else {
  console.error("Request failed:", asyncSuccess.error);
}

// Error handling for network failures
const networkFailure = await Utilify.safeRunAsync(async () => {
  const response = await fetch("https://invalid-url.com");
  if (!response.ok) throw new Error("Network error");
  return response.json();
});

if (!networkFailure.success) {
  console.log("Handled error:", networkFailure.error.message);
}
```

## 🧪 Testing

#### `Utilify.paginateArray<T>(items: T[], options?: { page?: number; pageSize?: number; zeroBased?: boolean }): Paginated<T>`

Paginates an array of items with configurable options, supporting both 1-based and zero-based pagination.

**Type Parameters:**

- `T`: The type of items in the array

**Parameters:**

- `items`: The array of items to paginate
- `options` (optional): Configuration object
  - `page`: The page number to retrieve (default: 1 for 1-based, 0 for zero-based)
  - `pageSize`: Number of items per page (default: 10)
  - `zeroBased`: Whether to use zero-based pagination (default: false)

**Returns:** `Paginated<T>` - An object containing:

- `data`: Array of items for the current page
- `currentPage`: The current page number
- `totalPages`: Total number of pages
- `totalItems`: Total number of items
- `pageSize`: Number of items per page
- `hasNextPage`: Whether there is a next page
- `hasPreviousPage`: Whether there is a previous page

**Example:**

```typescript
const items = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

// Basic pagination (1-based, default pageSize: 10)
const result = Utilify.paginateArray(items);
console.log(result.currentPage); // 1
console.log(result.totalPages); // 3
console.log(result.data.length); // 10

// Custom page and pageSize
const page2 = Utilify.paginateArray(items, { page: 2, pageSize: 5 });
console.log(page2.currentPage); // 2
console.log(page2.data.length); // 5

// Zero-based pagination
const zeroBased = Utilify.paginateArray(items, { page: 0, zeroBased: true });
console.log(zeroBased.currentPage); // 0
console.log(zeroBased.hasPreviousPage); // false
```

#### `Utilify.createUtils<TBase extends Record<string, any>, TExt extends Record<string, any>>(base: TBase, ext: Partial<TExt>, options?: { freezeBase?: boolean; freezeResult?: boolean }): TBase & TExt`

Creates an extended utility object by shallow merging a base object with extensions. Follows SOLID principles for extensible architecture.

**Type Parameters:**

- `TBase`: The base object type
- `TExt`: The extension object type

**Parameters:**

- `base`: The base object to extend
- `ext`: Partial extensions to merge into the base
- `options`: Optional configuration for freezing objects
  - `freezeBase`: Whether to freeze the base object (default: false)
  - `freezeResult`: Whether to freeze the result object (default: false)

**Returns:** `TBase & TExt` - The merged object with base and extensions

**Example:**

```typescript
import { createUtils, isJson, capitalize } from "utilifycore";

// Create extended utilities
const extendedUtils = createUtils(
  { isJson, capitalize },
  {
    customValidator: (value: any) => value !== null,
    formatDate: (date: Date) => date.toISOString(),
  },
  { freezeResult: true }, // Make result immutable
);

// Use extended utilities
console.log(extendedUtils.isJson('{"test": true}')); // true
console.log(extendedUtils.customValidator(null)); // false
console.log(extendedUtils.formatDate(new Date())); // "2025-10-25T..."
```

## 🧪 Testing

### Prerequisites

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

The project includes comprehensive tests covering:

- **Unit Tests**: Core functionality of each utility function
- **Integration Tests**: Cross-function interactions
- **Edge Cases**: Invalid inputs, boundary conditions, error handling
- **Cross-Environment**: Browser and Node.js compatibility

### Coverage Report

Current test coverage metrics:

- **Statements**: 100%
- **Branches**: 92.96%
- **Functions**: 100%
- **Lines**: 100%

Coverage reports are generated in the `coverage/` directory after running `npm run test:coverage`.

## 🏗️ Development

### Prerequisites

- **Node.js**: v14.0.0 or higher
- **TypeScript**: v4.0.0 or higher

### Setup

```bash
# Clone the repository
git clone https://github.com/RMRdeveloper/utilify.git
cd utilify

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build
```

### Project Structure

```
utilify/
├── src/
│   ├── core/
│   │   ├── validation/     # Type validation utilities
│   │   ├── strings/        # String manipulation utilities
│   │   ├── files/          # File operation utilities
│   │   ├── execution/      # Function execution utilities
│   │   ├── runners/        # Function composition utilities
│   │   └── exception-handler.ts
│   ├── index.ts            # Main entry point
│   └── index.d.ts          # TypeScript declarations
├── tests/                  # Test files
├── dist/                   # Built distribution files
├── package.json
├── tsconfig.json
├── jest.config.js
├── rollup.config.js
└── README.md
```

### Building

```bash
# Build for production
npm run build

# The build outputs:
# - dist/index.js (ESM)
# - dist/index.cjs (CommonJS)
# - dist/index.d.ts (TypeScript declarations)
```

### Scripts

| Script                  | Description                      |
| ----------------------- | -------------------------------- |
| `npm run build`         | Build the project for production |
| `npm test`              | Run all tests                    |
| `npm run test:watch`    | Run tests in watch mode          |
| `npm run test:coverage` | Run tests with coverage report   |
| `npm run prepare`       | Prepare husky git hooks          |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines

1. **Code Quality**: Follow TypeScript best practices and maintain 100% test coverage
2. **Testing**: Add tests for all new functionality and edge cases
3. **Documentation**: Update README and JSDoc comments for new features
4. **Compatibility**: Ensure cross-environment compatibility (Node.js + Browser)
5. **Performance**: Optimize for performance and bundle size

### Reporting Issues

- **Bug Reports**: [GitHub Issues](https://github.com/RMRdeveloper/utilify/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/RMRdeveloper/utilify/discussions)
- **Security Issues**: Contact maintainers directly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ronald Moreno**

- Email: rmorenorodriguez16@gmail.com
- GitHub: [@RMRdeveloper](https://github.com/RMRdeveloper)
- LinkedIn: [Ronald Moreno](https://www.linkedin.com/in/rmrdeveloper/)

## 🙏 Acknowledgments

- Built with [TypeScript](https://www.typescriptlang.org/)
- Tested with [Jest](https://jestjs.io/)
- Built with [Rollup](https://rollupjs.org/)
- Inspired by utility libraries like Lodash and Ramda

---

**⭐ Star this repository if you find it useful!**
