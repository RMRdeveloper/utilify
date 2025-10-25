# UtilifyCore

A lightweight, type-safe utility library for JavaScript and TypeScript projects that provides essential validation and checking functions.

## Features

- **Type-safe**: Written in TypeScript with full type definitions
- **Lightweight**: Minimal dependencies, focused on core utilities
- **Error handling**: Robust error handling with custom exceptions
- **Well-tested**: Comprehensive unit test coverage
- **ESM & CommonJS**: Supports both module systems

## Installation

```bash
npm install utilifycore
```

## Usage

### ES6 Import (Recommended)

```typescript
import Utilify from "utilifycore";

// Check if a string is valid JSON
console.log(Utilify.isJson('{"name": "John"}')); // true
console.log(Utilify.isJson("invalid json")); // false

// Check if a value is an object
console.log(Utilify.isObject({})); // true
console.log(Utilify.isObject([])); // false
console.log(Utilify.isObject(new Date())); // true

// Check if a value is empty
console.log(Utilify.isEmpty(null)); // true
console.log(Utilify.isEmpty("")); // true
console.log(Utilify.isEmpty([])); // true
console.log(Utilify.isEmpty({})); // true
console.log(Utilify.isEmpty("hello")); // false
console.log(Utilify.isEmpty([1, 2, 3])); // false
```

### CommonJS Require

```javascript
const Utilify = require("utilifycore");

// Same API as ES6 imports
console.log(Utilify.isJson('{"name": "John"}')); // true
console.log(Utilify.isObject({})); // true
console.log(Utilify.isEmpty(null)); // true
```

### Dynamic Import

```javascript
// ES6 dynamic import
import("utilifycore").then((Utilify) => {
  console.log(Utilify.default.isJson('{"test": true}')); // true
});
```

## API Reference

### `Utilify.isJson(value: unknown): boolean`

Checks if the provided value is a valid JSON string.

**Parameters:**

- `value` (unknown): The value to check

**Returns:** `boolean` - True if the value is a valid JSON string, false otherwise

**Examples:**

```typescript
Utilify.isJson('{"name": "John"}'); // true
Utilify.isJson("[1, 2, 3]"); // true
Utilify.isJson("invalid"); // false
Utilify.isJson(123); // false
```

### `Utilify.isObject(value: unknown): boolean`

Checks if the provided value is an object (but not an array).

**Parameters:**

- `value` (unknown): The value to check

**Returns:** `boolean` - True if the value is an object, false otherwise

**Examples:**

```typescript
Utilify.isObject({}); // true
Utilify.isObject({ name: "John" }); // true
Utilify.isObject(new Date()); // true
Utilify.isObject([]); // false
Utilify.isObject("string"); // false
Utilify.isObject(null); // false
```

### `Utilify.isEmpty(value: unknown): boolean`

Checks if the provided value is empty (null, undefined, empty string, empty array, or empty object).

**Parameters:**

- `value` (unknown): The value to check

**Returns:** `boolean` - True if the value is empty, false otherwise

**Examples:**

```typescript
Utilify.isEmpty(null); // true
Utilify.isEmpty(undefined); // true
Utilify.isEmpty(""); // true
Utilify.isEmpty([]); // true
Utilify.isEmpty({}); // true
Utilify.isEmpty("hello"); // false
Utilify.isEmpty([1, 2, 3]); // false
Utilify.isEmpty(0); // false
Utilify.isEmpty(false); // false
```

## Error Handling

Utilify uses a custom exception system for better error reporting. All functions are wrapped in a safe execution context that catches errors and provides meaningful error messages.

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd utilify

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Run tests in watch mode
npm run test:watch

# Generate test coverage
npm run test:coverage
```

### Project Structure

```
utilify/
├── src/
│   ├── index.ts           # Main entry point
│   ├── index.d.ts         # Type definitions
│   └── core/
│       ├── is-json.ts     # JSON validation
│       ├── is-object.ts   # Object validation
│       ├── is-empty.ts    # Empty value check
│       ├── exception-handler.ts  # Custom exceptions
│       ├── orchestrator.ts       # Core orchestration
│       └── runners/
│           └── safe-run.ts       # Safe execution wrapper
├── tests/
│   └── index.test.ts      # Unit tests
├── dist/                  # Compiled output
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

The project includes comprehensive unit tests using Jest. To run the tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Ronald Moreno <rmorenorodriguez16@gmail.com>

## Keywords

utility, library, javascript, typescript, utils, helpers, tools, validation, type-checking
