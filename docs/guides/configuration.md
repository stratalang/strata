# Configuration

Strata projects are configured using a `.strata.json` file in the project root. This file controls compilation settings, formatting options, and project structure.

## Quick Start

Initialize a new project with default configuration:

```bash:no-line-numbers
strata init
```

This creates a `.strata.json` file with sensible defaults.

## Configuration File

The `.strata.json` file is a JSON configuration file that must be placed in your project root directory.

### Example Configuration

```json
{
  "srcDir": "src",
  "buildDir": "build",
  "entryPoint": "src/index.str",
  "fmt": {
    "indentStyle": "spaces",
    "indentSize": 4,
    "lineEnding": "lf",
    "maxLineLength": 120,
    "trailingCommas": true
  }
}
```

## Configuration Options

### Project Structure

#### `srcDir`

- **Type:** `string`
- **Default:** `"src"`
- **Description:** Source directory containing your Strata files.

```json
{
  "srcDir": "src"
}
```

You can use `"."` to use the project root as the source directory:

```json
{
  "srcDir": "."
}
```

#### `buildDir`

- **Type:** `string`
- **Default:** `"build"`
- **Description:** Output directory for compiled PHP files.

```json
{
  "buildDir": "build"
}
```


#### `phpInterop`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable PHP class introspection for LSP features (hover tooltips, completion).

When enabled, the Language Server will use PHP reflection and DocBlock annotations to provide type information for PHP classes and methods. This enables features like:
- Hover tooltips showing method signatures from PHP classes
- Completion for PHP class members
- Support for Laravel's magic methods (`@method` annotations)

```json
{
  "phpInterop": true
}
```

**Performance:** PHP introspection results are cached for performance. Enable this option if you're working with PHP frameworks like Laravel.

#### `entryPoint`

- **Type:** `string | null`
- **Default:** `null`
- **Description:** Default entry point file for `build`, `run`, and `serve` commands.

The path can be:
- Relative to project root: `"src/index.str"`
- Relative to `srcDir`: `"index.str"` (will resolve to `srcDir/index.str`)

```json
{
  "entryPoint": "src/index.str"
}
```

When set, you can run commands without specifying a file:

```bash:no-line-numbers
strata build    # Uses entryPoint from config
strata run      # Uses entryPoint from config
strata serve    # Uses entryPoint from config
```

### Analysis Options (`analysis`)

Control semantic analysis and linting behavior.

#### `analysis.unusedDeclarations`

- **Type:** `"strict" | "lenient" | "none"`
- **Default:** `"strict"`
- **Description:** How to handle unused variables, imports, and functions.

- `"strict"` - All unused declarations are reported as errors.
- `"lenient"` - Unused declarations are reported as warnings (ignores protected/private members often used by frameworks/reflection).
- `"none"` - Unused declarations are ignored.

```json
{
  "analysis": {
    "unusedDeclarations": "strict"
  }
}
```

#### `analysis.phpStyleTypeChecks`

- **Type:** `"warn" | "ignore"`
- **Default:** `"warn"`
- **Description:** How to handle PHP-style type checks (e.g. `is_string`, `is_int`).

- `"warn"` - Reports a warning encouraging the use of native Strata type guards (`is String`, `is Int`).
- `"ignore"` - Allows PHP-style type checks without warnings.

```json
{
  "analysis": {
    "phpStyleTypeChecks": "ignore"
  }
}
```

### Formatting Options (`fmt`)

The `fmt` section controls code formatting settings used by the `strata fmt` command and other formatting tools.

#### `indentStyle`

- **Type:** `"spaces" | "tabs"`
- **Default:** `"spaces"`
- **Description:** Indentation style.

```json
{
  "fmt": {
    "indentStyle": "spaces"
  }
}
```

**Important:** Strata uses **spaces** by default. This is the recommended setting for consistency across the ecosystem.

#### `indentSize`

- **Type:** `number`
- **Default:** `4`
- **Description:** Number of spaces per indentation level (when `indentStyle` is `"spaces"`).

```json
{
  "fmt": {
    "indentSize": 4
  }
}
```

**Important:** The default is **4 spaces**. This is the standard across the Strata ecosystem.

#### `lineEnding`

- **Type:** `"lf" | "crlf" | "cr"`
- **Default:** `"lf"`
- **Description:** Line ending style.

```json
{
  "fmt": {
    "lineEnding": "lf"
  }
}
```

- `"lf"` - Unix/Linux/macOS line endings (recommended)
- `"crlf"` - Windows line endings
- `"cr"` - Classic Mac line endings

#### `maxLineLength`

- **Type:** `number`
- **Default:** `120`
- **Description:** Maximum line length before wrapping.

```json
{
  "fmt": {
    "maxLineLength": 120
  }
}
```

**Important:** The default is **120 characters**. This is the standard across the Strata ecosystem.

#### `braceStyle`

- **Type:** `"same-line" | "new-line"`
- **Default:** `"same-line"`
- **Description:** Placement of opening brace.

```json
{
  "fmt": {
    "braceStyle": "same-line"
  }
}
```

- `"same-line"` - Open brace on the same line as declaration (OTBS/K&R)
- `"new-line"` - Open brace on a new line (Allman)

#### `importOrder`

- **Type:** `"alphabetical" | "grouped"`
- **Default:** `"alphabetical"`
- **Description:** Sort order for import statements.

```json
{
  "fmt": {
    "importOrder": "alphabetical"
  }
}
```

- `"alphabetical"` - Sort all imports alphabetically by name
- `"grouped"` - Group imports by namespace, then sort alphabetically within each group

**Grouped Import Order:**

When using `"grouped"`, imports are organized into two groups:
1. **Standard Library** - Imports starting with `Strata.` (e.g., `Strata.HTTP.Request`)
2. **Project/Vendor** - All other imports (e.g., `App.User`, `Vendor.Package`)

Groups are sorted alphabetically and separated by a blank line.

**Example:**
```strata
// input (mixed order)
import Zebra.Zoo;
import Strata.HTTP.Request;
import App.User;
import Strata.IO.File;

// output with "grouped"
import Strata.HTTP.Request;
import Strata.IO.File;

import App.User;
import Zebra.Zoo;
```

#### `quoteStyle`

- **Type:** `"double" | "single"`
- **Default:** `"double"`
- **Description:** Quote style for string literals.

```json
{
  "fmt": {
    "quoteStyle": "double"
  }
}
```

#### `arrowParens`

- **Type:** `"always" | "avoid"`
- **Default:** `"always"`
- **Description:** Parentheses around arrow function parameters.

```json
{
  "fmt": {
    "arrowParens": "always"
  }
}
```

- `"always"` - Always include parentheses: `(x) => x`
- `"avoid"` - Omit parentheses when possible (currently single parameter without type): `x => x`

#### `spacesInObjectPattern`

- **Type:** `boolean`
- **Default:** `true`
- **Description:** Whether to add spaces inside object destructuring patterns braces.

```json
{
  "fmt": {
    "spacesInObjectPattern": true
  }
}
```

- `true`: `destructure { a, b } = x;`
- `false`: `destructure {a, b} = x;`

#### `spacesInFunctionCalls`

- **Type:** `boolean`
- **Default:** `true`
- **Description:** Whether to add spaces inside function call parentheses for single-line calls.

```json
{
  "fmt": {
    "spacesInFunctionCalls": true
  }
}
```

- `true`: `call( a, b )`
- `false`: `call(a, b)`

#### `spacesAroundOperators`

- **Type:** `boolean`
- **Default:** `true`
- **Description:** Whether to add spaces around binary operators.

```json
{
  "fmt": {
    "spacesAroundOperators": true
  }
}
```

- `true`: `1 + 2`
- `false`: `1+2`

#### `trailingCommas`

- **Type:** `boolean`
- **Default:** `true`
- **Description:** Whether to add a trailing comma to the last item in multi-line arrays, function parameters, and function calls.

```json
{
  "fmt": {
    "trailingCommas": true
  }
}
```

Trailing commas are only added to **multi-line** constructs. Single-line constructs never receive trailing commas.

#### `insertFinalNewline`

- **Type:** `boolean`
- **Default:** `true`
- **Description:** Ensure the file ends with a newline character.

```json
{
  "fmt": {
    "insertFinalNewline": true
  }
}
```

#### `trimTrailingWhitespace`

- **Type:** `boolean`
- **Default:** `true`
- **Description:** Remove trailing whitespace from each line.

```json
{
  "fmt": {
    "trimTrailingWhitespace": true
  }
}
```

## Default Configuration

When you run `strata init`, the following default configuration is created:

```json
{
  "srcDir": "src",
  "buildDir": "build",
  "entryPoint": "src/index.str",
  "fmt": {
    "indentStyle": "spaces",
    "indentSize": 4,
    "lineEnding": "lf",
    "maxLineLength": 120,
    "trailingCommas": true
  }
}
```

## Formatting Standards

Strata enforces consistent formatting standards across the ecosystem:

- **Indentation:** 4 spaces (never tabs)
- **Line Length:** 120 characters maximum
- **Line Endings:** LF (Unix-style)

These defaults are used by:
- The `strata fmt` command
- Code generation tools
- IDE integrations

### Smart Multi-line Preservation

The Strata formatter is designed to respect your intentions for multi-line code while enforcing consistency:

1.  **Preserved Grouping**: If you manually place an array, function call, or parameter list on multiple lines, the formatter will respect that choice.
2.  **Item Consolidation**: Within those multi-line boundaries, items will be kept on a single line if they fit within the `maxLineLength`.
3.  **Automatic Explosion**: If the combined items (with a trailing comma) exceed the `maxLineLength`, or if they were already individually line-broken by the user, the formatter will "explode" them into one item per line.
4.  **Trailing Commas**: For all multi-line constructs, a trailing comma is added to the last item (if enabled in config), making git diffs cleaner and reordering items easier.

### Why These Defaults?

- **4 spaces:** Provides clear visual hierarchy without excessive indentation
- **120 characters:** Balances readability with modern wide screens
- **LF line endings:** Consistent across Unix/Linux/macOS and modern Windows tools

## CLI Flag Precedence

CLI flags always override configuration file settings:

```bash:no-line-numbers
# uses srcDir from .strata.json
strata build

# overrides srcDir with CLI flag
strata build --src=source

# overrides buildDir with CLI flag
strata build --out=dist
```

**Precedence order (highest to lowest):**
1. CLI flags
2. `.strata.json` configuration
3. Built-in defaults

## Configuration Validation

Strata validates your `.strata.json` file:
- Must be valid JSON
- Unknown keys are ignored (for forward compatibility)
- Invalid values fall back to defaults

## Examples

### Minimal Configuration

```json
{
  "entryPoint": "src/index.str"
}
```

All other settings use defaults.

### Custom Source Directory

```json
{
  "srcDir": "app",
  "buildDir": "dist",
  "entryPoint": "app/main.str"
}
```

### Custom Formatting

```json
{
  "fmt": {
    "indentSize": 2,
    "maxLineLength": 100
  }
}
```

**Note:** While you can customize formatting, the ecosystem standard is 4 spaces and 120 characters. Consider using the defaults for consistency.

## Composer Integration

Strata seamlessly integrates with Composer for dependency management and autoloading, though it is completely optional.

### Automatic Autoload Injection

When using Composer in your project, Strata automatically injects the `vendor/autoload.php` require statement into entry point files. **You should not manually require `vendor/autoload.php`** in your Strata code.

#### How It Works

1. **Entry Points**: The compiler automatically adds `require __DIR__ . '/../vendor/autoload.php';` to entry point files
2. **Smart Injection**:
   - It checks if the file already contains a `require` for the autoloader to avoid duplicates.
   - It respects `declare(strict_types=1);` and places the require statement *after* it.
3. **Path Resolution**:
   - In `build` command: Uses relative paths for portability
   - In `run`/`serve` commands: Automatically patches to absolute paths for correct execution
4. **Composer-less Support**: If `vendor/autoload.php` is missing, Strata scans your project root for classes and generates a temporary autoloader, allowing you to run simple projects without Composer.

#### Example

**Your Strata code** (`src/index.str`):
```strata
import App.User;

fn main(): Void {
    let user = User(name: "Luna");
    echo user.getName();
}
```

**Compiled PHP** (`build/index.php`):
```php
<?php
declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

// ... compiled code ...
```

The `vendor/autoload.php` require is automatically added - you don't need to write it.

### Require Statements for Other Files

You can use `require` statements for non-Composer files (like PHP configuration files):

```strata
require __DIR__ . "/../config.php";
require __DIR__ . "/../bootstrap.php";
```

**Important Notes:**

1. **Path Resolution**:
   - In `build` command: Paths remain relative (for portability)
   - In `run`/`serve` commands: Paths are automatically patched to absolute paths

2. **File Location**: Required files can be:
   - In the project root
   - In subdirectories
   - Outside `srcDir` (paths are resolved correctly)

3. **Example**:
   ```strata
   // require a config file at project root
   require __DIR__ . "/../config.php";

   // this works even if config.php is outside srcDir
   ```

### Composer PSR-4 Configuration

Strata compiles to PHP, and Composer's PSR-4 autoloading works with the compiled output. Configure your `composer.json` to point to the build directory:

```json
{
  "autoload": {
    "psr-4": {
      "App\\": "build/app"
    }
  }
}
```

**Important**: Point PSR-4 namespaces to your `buildDir`, not `srcDir`. Strata compiles `.str` files to `.php` files in the build directory.

### Working with Composer Packages

1. **Install packages** with Composer:
   ```bash:no-line-numbers
   composer require monolog/monolog
   ```

2. **Enable PHP Interop**:
   Set `"phpInterop": true` in your `.strata.json`.

3. **Use in Strata code**:
   ```strata
   import Monolog.Logger;

   fn main(): Void {
       // Logger is available via Composer autoload
       // phpInterop provides LSP features like hover and completion
   }
   ```

4. **Compile and run**: The `vendor/autoload.php` is automatically included.

### Best Practices

1. **Don't manually require `vendor/autoload.php`** - Let Strata handle it automatically
2. **Configure PSR-4 to point to `buildDir`** - Not `srcDir`
3. **Use phpInterop for better IDE support** - Enable it in your configuration
4. **Keep vendor directory in project root** - Don't copy it to build output

### Troubleshooting

#### "Class not found" errors

- **Check PSR-4 configuration**: Ensure `composer.json` points to `buildDir`
- **Regenerate autoload**: Run `composer dump-autoload`
- **Verify build output**: Ensure files are compiled to the expected location

#### Require path errors in `run`/`serve`

- Paths are automatically patched - this should work automatically
- If issues persist, check that files exist at the expected location

## See Also

- [Code Guidelines](/language/code-guidelines) - Coding standards and best practices
- [PHP Interoperability](/language/advanced/php-interop.md) - Using PHP features in Strata
- [CLI Commands](/cli/) - Command-line tool reference
- [Getting Started](/getting-started/) - Project setup guide

