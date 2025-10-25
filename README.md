# UtilifyCore

[![npm version](https://badge.fury.io/js/utilifycore.svg)](https://badge.fury.io/js/utilifycore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25_statements-4CAF50)](https://github.com/RMRdeveloper/utilify)

A lightweight, type-safe utility library for JavaScript and TypeScript projects that provides essential validation, string transformation, file operations, and function utilities with **100% test coverage**.

## ✨ Features

- **🏆 100% Test Coverage**: Complete statement, line, and function coverage
- **🔒 Type-safe**: Written in TypeScript with full type definitions and runtime validation
- **⚡ High Performance**: Optimized for speed with minimal overhead
- **📦 Lightweight**: Small bundle size (~4.8KB packaged, 16.3KB unpacked)
- **🔄 ESM & CommonJS**: Supports both modern and legacy module systems
- **🚫 Zero Dependencies**: Pure JavaScript/TypeScript implementation
- **🌍 Cross-Environment**: Works in Node.js, browsers, and other JavaScript environments
- **🛡️ Error Safety**: Comprehensive input validation with descriptive error messages

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
} from "utilifycore";

// Use individual functions directly
console.log(isJson('{"valid": true}')); // true
console.log(capitalize("hello")); // "Hello"
console.log(toKebabCase("PascalCase")); // "pascal-case"
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

#### `Utilify.safeRun<T>(fn: () => T, defaultValue: T): T`

Runs a given function in a safe execution context, catching any errors and returning a default value instead. If the error is an instance of UtilifyException, it logs an error message to the console.

**Type Parameters:**

- `T`: The return type of the function

**Parameters:**

- `fn`: The function to run in a safe execution context
- `defaultValue`: The default value to return if an error occurs

**Returns:** `T` - The result of the function, or the default value if an error occurs

**Throws:** `UtilifyException` - If fn is not a function

**Example:**

```typescript
const result = Utilify.safeRun(() => {
  // Some risky operation
  return JSON.parse('{"valid": true}');
}, {});

// With error handling
const riskyResult = Utilify.safeRun(() => {
  throw new Error("Something went wrong");
}, "default value");
console.log(riskyResult); // "default value"
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
- **Branches**: 92.79%
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

- Email: ronaldmorenorodriguez1990@gmail.com
- GitHub: [@RMRdeveloper](https://github.com/RMRdeveloper)
- LinkedIn: [Ronald Moreno](https://www.linkedin.com/in/ronald-moreno-rodriguez/)

## 🙏 Acknowledgments

- Built with [TypeScript](https://www.typescriptlang.org/)
- Tested with [Jest](https://jestjs.io/)
- Built with [Rollup](https://rollupjs.org/)
- Inspired by utility libraries like Lodash and Ramda

---

**⭐ Star this repository if you find it useful!**
