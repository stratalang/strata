# Language Server (LSP) & Editor Support

Strata is designed with a **tooling-first** philosophy. The Strata Language Server Protocol (LSP) provides a rich set of features to your editor, providing intelligent code completion, real-time diagnostics, and seamless PHP interoperability.

## Features

### Intelligent Code Completion

The LSP provides context-aware completions for:

- **Variables & Functions**: Suggests available symbols from the current scope and global space.
- **Methods & Properties**: Suggests correct members when typing `object.` based on type inference.
- **Keywords**: Context-sensitive keyword suggestions (e.g., `fn`, `let`, `class`).
- **Standard Library**: Built-in functions and classes are fully supported.

### Go to Definition

Quickly navigate your codebase by jumping to the declaration of functions, classes, variables, and imports using **Ctrl+Click** (or `F12`).

- **Strata Symbols**: Jump between files for any Strata-defined symbol.
- **PHP Interop**: Jump directly to the PHP source code for external classes, methods, and properties (requires `phpInterop: true` in `.strata.json`).
- **Imports**: Click an import path to open the corresponding file.

### Hover Information

Get instant information about any symbol by hovering over it.

- **Type Inference**: See the inferred type of variables and expressions.
- **Signatures**: View method signatures and type information for both Strata and PHP symbols.
- **Member Info**: Hover over method calls or property accesses to see their origin and type.

### Real-Pro Diagnostics

Strata provides real-time feedback as you type:

- **Syntax Errors**: Instant reporting of parsing issues, catching missing semicolons or braces immediately.
- **Type Checking**: Validation of types, null safety, and return type compatibility.
- **Undefined Symbols**: Warns about usage of unknown variables or functions.
- **Precise Locations**: Error messages highlight exact line and character ranges.

### PHP Interop Features

When `phpInterop` is enabled, the LSP becomes even more powerful by introspecting your PHP dependencies:

- **PHP Reflection**: Information is pulled directly from PHP's reflection engine.
- **DocBlock Support**: Method parameters and return types are extracted from `@param`, `@return`, and `@var` tags.
- **Laravel Support**: Compatibility with `@method` and `@property` annotations commonly used in Laravel models and facades.

### Tolerant Parsing

The parser is designed to be "tolerant," meaning it can recover from syntax errors and continue providing features for the rest of the file.

- If you have a syntax error in one function, completions and navigation in other functions still work.
- Incomplete code (e.g., `let x = `) is handled gracefully to offer completions for the right-hand side.

## Configuration

You can configure the LSP analysis in your `.strata.json` file:

```json
{
    "phpInterop": true,
    "analysis": {
        "unusedDeclarations": "strict", // "strict", "lenient", or "none"
        "missingReturn": "warn"
    }
}
```

- **phpInterop**: Enables deep introspection of PHP dependencies (default: false).
- **analysis**: Configures strictness of specific rules.

## Supported Editors

- **VS Code**: Official extension available with full LSP support. This is the primary and recommended editor for Strata development.
- **Other Editors**: Any editor supporting the standard Language Server Protocol can connect to the Strata Language Server, though specific setup steps may vary.
