# UtilifyCore

A lightweight, type-safe utility library for JavaScript and TypeScript projects that provides essential validation, string transformation, and function utilities.

## Features

- **Type-safe**: Written in TypeScript with full type definitions
- **Lightweight**: Minimal bundle size (~3.7KB gzipped)
- **ESM & CommonJS**: Supports both module systems
- **Zero dependencies**: Pure JavaScript/TypeScript implementation

## Installation

```bash
npm install utilifycore
```

## Usage

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

### CommonJS Require

```javascript
const Utilify = require("utilifycore");

console.log(Utilify.isJson('{"name": "John"}')); // true
console.log(Utilify.isObject({})); // true
```

## API Reference

### Validation Functions

#### `Utilify.isJson(value: unknown): boolean`

Checks if the provided value is a valid JSON string.

#### `Utilify.isObject(value: unknown): boolean`

Checks if the provided value is an object (but not an array).

#### `Utilify.isEmpty(value: unknown): boolean`

Checks if the provided value is empty (null, undefined, empty string, empty array, or empty object).

### String Functions

#### `Utilify.capitalize(value: string): string`

Capitalizes the first letter of a string.

#### `Utilify.toKebabCase(value: string): string`

Converts a string to kebab-case.

#### `Utilify.toSnakeCase(value: string): string`

Converts a string to snake_case.

### Function Utilities

#### `Utilify.debounce(fn: Function, delay?: number): Function`

Returns a debounced version of the provided function. The default delay is 250ms.

**Parameters:**

- `fn`: The function to debounce
- `delay`: (optional) The delay in milliseconds (default: 250)

**Example:**

```typescript
const debouncedSearch = Utilify.debounce((query: string) => {
  console.log("Searching for:", query);
}, 300);

debouncedSearch("hello"); // Will execute after 300ms
```

#### `Utilify.flow(...functions): Function`

Composes multiple functions into a single pipeline, applying them sequentially from left to right. Each function receives the output of the previous function as its input. Requires at least 2 functions.

**Parameters:**

- `...functions`: Two or more functions to compose (minimum 2, maximum 10)

**Returns:**

- A function that takes the initial input and applies all functions in sequence

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

## License

MIT License

## Author

Ronald Moreno <ronaldmorenorodriguez1990@gmail.com>
