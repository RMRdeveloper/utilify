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

Returns a debounced version of the provided function.

## License

MIT License

## Author

Ronald Moreno <ronaldmorenorodriguez1990@gmail.com>
