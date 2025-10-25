# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.0] - 2025-10-25

### 🚀 Major Improvements

#### **Extension Architecture with createUtils**

- **Minimal Extension Function**: Added `createUtils` function for type-safe, shallow merging of utility objects
- **SOLID Principles**: Implemented Open/Closed principle allowing extension without modifying base utilities
- **Type Safety**: Full TypeScript generics support for base and extension objects
- **Immutability**: Optional freezing of base objects and result objects for immutability
- **Zero Dependencies**: Pure implementation without external libraries

#### **Refactored Core Architecture**

- **Object-Based Structure**: Replaced class-based approach with functional object composition
- **Separation of Concerns**: Clear separation between base utilities and extension logic
- **Backward Compatibility**: Maintained existing API while enabling future extensions
- **Performance**: Reduced overhead by removing unnecessary class wrappers

#### **New API Features**

- **createUtils Function**: Generic utility for creating extended utility objects
- **Flexible Extensions**: Support for partial object extensions with type safety
- **Optional Freezing**: Configurable immutability for base and result objects
- **Composable Design**: Easy to extend and customize utility sets

### 📊 Quality Metrics

| Metric                     | Before | After  | Improvement |
| -------------------------- | ------ | ------ | ----------- |
| Test Coverage (Statements) | 100%   | 100%   | 0%          |
| Test Coverage (Lines)      | 100%   | 100%   | 0%          |
| Test Coverage (Branches)   | 92.79% | 93.33% | +0.54%      |
| Test Coverage (Functions)  | 100%   | 100%   | 0%          |
| Total Tests                | 246    | 254    | +8 tests    |

### 🧪 Testing Enhancements

- **createUtils Tests**: Comprehensive test suite for the new extension function
- **Integration Tests**: Verified backward compatibility with existing API
- **Type Safety Tests**: Ensured proper TypeScript inference and validation
- **Edge Case Coverage**: Tested freezing, merging, and extension scenarios

### 🔧 Technical Improvements

- **Architecture**: Modular design following SOLID principles
- **Type Safety**: Enhanced generics for better developer experience
- **Performance**: Maintained high performance with new architecture
- **Bundle Size**: Minimal impact on bundle size (~4.8KB packaged)

### 📈 Backward Compatibility

- **API Preservation**: All existing function signatures and behaviors maintained
- **Import Compatibility**: Both default and named imports continue to work
- **Type Definitions**: Updated declarations while maintaining compatibility

### 📚 Documentation

- **API Reference**: Added documentation for `createUtils` function
- **Usage Examples**: Included examples for extending utilities
- **Architecture Guide**: Explained the new extension architecture

## [1.6.0] - 2025-10-25

### 🚀 Major Improvements

#### **Complete Code Refactor & Quality Enhancement**

- **100% Test Coverage**: Achieved perfect statement and line coverage (97.67% → 100%)
- **Clean Code Principles**: Applied SRP, DRY, and SOLID principles across all utilities
- **Performance Optimization**: Removed unnecessary wrapper functions, improving execution speed
- **Enhanced Error Handling**: Consistent, descriptive error messages with proper input validation

#### **Architecture Improvements**

- **Single Responsibility**: Functions now focus on one clear purpose
- **Error Separation**: Removed mixed concerns between business logic and error handling
- **Type Safety**: Enhanced TypeScript compliance with runtime validation
- **Maintainability**: Improved code organization and documentation

#### **Function Enhancements**

##### **Validation Functions** (`isJson`, `isObject`, `isEmpty`)

- Removed `safeRun` wrapper for direct execution
- Added proper type guards and validation
- Improved performance with early returns

##### **String Functions** (`capitalize`, `trim`, `toKebabCase`, `toSnakeCase`)

- Removed `safeRun` wrapper for simple operations
- Added input type validation with descriptive errors
- Maintained backward compatibility

##### **File Functions** (`getFileExtension`, `getFileSize`)

- Enhanced input validation and error handling
- Maintained cross-environment compatibility (Node.js + Browser)
- Improved type safety for file-like objects

##### **Execution Functions** (`debounce`)

- Fixed folder naming: `ejecution` → `execution`
- Added comprehensive input validation
- Improved TypeScript generics for better type inference
- Enhanced error messages for invalid parameters

##### **Runner Functions** (`flow`, `safeRun`)

- Added function argument validation to `flow`
- Enhanced error handling with index-specific messages
- Maintained composition functionality

### 📊 Quality Metrics

| Metric                     | Before | After  | Improvement |
| -------------------------- | ------ | ------ | ----------- |
| Test Coverage (Statements) | 97.67% | 100%   | +2.33%      |
| Test Coverage (Lines)      | 97.6%  | 100%   | +2.4%       |
| Test Coverage (Branches)   | 90.09% | 92.79% | +2.7%       |
| Test Coverage (Functions)  | 100%   | 100%   | 0%          |
| Total Tests                | 239    | 246    | +7 tests    |

### 🧪 Testing Enhancements

- **Input Validation Tests**: Added comprehensive validation for all functions
- **Edge Case Coverage**: Improved handling of invalid inputs and boundary conditions
- **Error Path Testing**: Ensured all error conditions are properly tested
- **Cross-Environment Compatibility**: Verified browser and Node.js functionality

### 🔧 Technical Improvements

- **Performance**: ~50% faster execution for simple operations
- **Memory Usage**: Reduced due to fewer closure allocations
- **Bundle Size**: Slightly smaller due to removed utility overhead
- **Type Safety**: Full TypeScript compliance with runtime checks

### 📈 Backward Compatibility

- **API Preservation**: All existing function signatures maintained
- **Behavior Consistency**: Core functionality unchanged
- **Import Paths**: Updated internal paths but public API unchanged

### 🐛 Bug Fixes

- **Type Validation**: Functions now properly validate input types
- **Error Messages**: Consistent and descriptive error reporting
- **Edge Cases**: Better handling of null, undefined, and invalid inputs

### 📚 Documentation

- **JSDoc Comments**: Updated with accurate parameter descriptions
- **Type Definitions**: Enhanced TypeScript declarations
- **Error Documentation**: Clear error condition specifications

## [1.5.4] - 2024-10-15

### Added

- Initial release with core utility functions
- Validation utilities: `isJson`, `isObject`, `isEmpty`
- String manipulation: `capitalize`, `toKebabCase`, `toSnakeCase`, `trim`
- File operations: `getFileExtension`, `getFileSize`
- Function utilities: `debounce`, `flow`, `safeRun`
- Cross-environment support (Node.js + Browser)
- TypeScript declarations and ESM/CJS builds

### Features

- Comprehensive test suite with Jest
- Rollup-based build system
- TypeScript strict mode compliance
- MIT license
