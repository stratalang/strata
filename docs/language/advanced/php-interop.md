# PHP Interoperability

Strata provides seamless access to PHP built-in constants, superglobals, and features. When compiling to PHP, these elements integrate naturally with the PHP runtime.

## PHP Magic Constants

PHP magic constants are available without the `$` prefix:

```strata
let dir = __DIR__;
let file = __FILE__;
let line = __LINE__;
let func = __FUNCTION__;
let cls = __CLASS__;
let method = __METHOD__;
let namespace = __NAMESPACE__;
let trait = __TRAIT__;
```

These compile directly to their PHP equivalents.

### Example

```strata
fn getCurrentFile(): String {
    return __FILE__;
}

fn getCurrentDirectory(): String {
    return __DIR__;
}
```

## PHP Superglobals

PHP superglobals are accessed without the `$` prefix in Strata, but compile to PHP superglobals with `$`:

```strata
let serverName = _SERVER['SERVER_NAME'];
let getParam = _GET['param'];
let postData = _POST['data'];
let cookie = _COOKIE['name'];
let files = _FILES['upload'];
let env = _ENV['PATH'];
let request = _REQUEST['key'];
let globals = GLOBALS['variable'];
```

These compile to `$_SERVER`, `$_GET`, `$_POST`, etc. in PHP.

### Example: Web Request

```strata
fn getRequestMethod(): String {
    return _SERVER['REQUEST_METHOD'];
}

fn getQueryParam(key: String): String? {
    if _GET.hasKey(key: key) {
        return _GET[key];
    }

    return Null;
}
```

## PHP Built-in Constants

PHP core constants are available without the `$` prefix:

```strata
let version = PHP_VERSION;
let os = PHP_OS;
let eol = PHP_EOL;
let intMax = PHP_INT_MAX;
let intMin = PHP_INT_MIN;
let allErrors = E_ALL;
```

Available constants include:

- **Core constants**: `PHP_VERSION`, `PHP_OS`, `PHP_SAPI`, `PHP_EOL`, `PHP_INT_MAX`, `PHP_INT_MIN`
- **Error constants**: `E_ALL`, `E_ERROR`, `E_WARNING`, `E_NOTICE`, `E_DEPRECATED`
- **Standard constants**: `TRUE`, `FALSE`, `NULL`, `DIRECTORY_SEPARATOR`, `PATH_SEPARATOR`

### Example

```strata
fn getPhpInfo(): String {
    return "PHP ${PHP_VERSION} on ${PHP_OS}";
}

fn logError(message: String): Void {
    error_log(message: message, errorType: E_ERROR);
}
```

## String Concatenation

You can use both the `.` operator and the `+` operator for string concatenation:

```strata
let path = __DIR__ . "/vendor/autoload.php";
let path = __DIR__ + "/vendor/autoload.php";
```

When using `+` operator with string-like values, it automatically converts to PHP's `.` concatenation operator:

```strata
// compiles to: __DIR__ . "/vendor/autoload.php"
let path1 = __DIR__ . "/vendor/autoload.php";

// compiles to: $_SERVER['SCRIPT_NAME'] . "/config.php"
let path2 = _SERVER['SCRIPT_NAME'] . "/config.php";
```

## Working with PHP Frameworks

Strata provides seamless integration with PHP frameworks like Laravel through `phpInterop`.

### PHP Interop

Enable `phpInterop` in `.strata.json` for automatic PHP class introspection:

```json
{
  "phpInterop": true
}
```

This enables:
- **Full LSP Integration**:
  - **Go to Definition**: Jump directly to PHP source files for classes, methods, and properties.
  - **Hover Tooltips**: View method signatures, parameter info, and property types extracted from PHP DocBlocks and Reflection.
  - **Auto-completion**: Intelligent completion for PHP class members in your editor.
- **Magic Member Support**: Full compatibility with Laravel's `@method` and `@property` annotations (e.g., `User::find`, `User::all`, `user.id`).
- **Seamless Access**: Support for instance properties, static methods, and static properties.
- **Performance**: High-performance metadata caching for instantaneous response times.

### Automatic Autoload Injection

**Important:** Strata automatically handles class loading.

If you are using Composer, Strata automatically detects it and injects `vendor/autoload.php` into entry point files.

The compiler will:
- Automatically add `require __DIR__ . '/../vendor/autoload.php';` if `composer.json` is present
- Use an internal autoloader if Composer is not used
- Patch paths correctly for `build`, `run`, and `serve` commands

See the [Configuration Guide](/guides/configuration#composer-integration) for complete details on Composer integration.


## PHP Functions

PHP built-in functions can be called directly, especially array functions that accept callbacks:

```strata
let numbers: Array<Int> = [1, 2, 3, 4, 5];

// array_map with expression lambda
let doubled = array_map((number: Int): Int => number * 2, numbers);

// array_reduce with block lambda
let total: Int = array_reduce(
    numbers,
    (carry: Int, item: Int): Int => {
        return carry + item;
    },
    0
);

// array_filter
let evens = array_filter(numbers, (number: Int): Bool => number % 2 == 0);

// print_r for debugging
print_r(doubled);
```

### Lambda Functions with PHP

Strata lambdas work seamlessly with PHP functions that accept callbacks:

**Expression-bodied lambdas** compile to PHP arrow functions:
```strata
let doubled = array_map((number: Int): Int => number * 2, numbers);
// compiles to: array_map(fn($number) => $number * 2, $numbers)
```

**Block-bodied lambdas** compile to PHP closures with automatic variable capture:
```strata
let offset: Int = 7;
let result = array_reduce(numbers, (carry: Int, item: Int): Int => {
    return carry + item + offset;  // offset is automatically captured
}, 0);
// compiles to: array_reduce($numbers, function($carry, $item) use ($offset) { ... }, 0)
```

**Automatic Variable Capture:**
- Variables from outer scopes are automatically captured
- Expression lambdas: captured by value (PHP arrow functions)
- Block lambdas: captured with `use ($var)` clause
- No explicit `use` clause needed in Strata code

**Type Checking:**
- Lambda parameters and return types are validated
- `array_reduce` has special type checking for callback signatures
- Type errors are caught at compile time

## Compiling to PHP

When Strata compiles to PHP:

1. **Types are preserved** where possible
2. **Null safety** is enforced at compile time
3. **Result types** compile to try-catch blocks
4. **Named arguments** compile to PHP 8+ named arguments

### Example: Compiled Output

**Strata:**
```strata
fn greet(name: String): String {
    return "Hello, ${name}!";
}
```

**Compiled PHP:**
```php
<?php
declare(strict_types=1);

function greet(string $name): string {
    return "Hello, {$name}!";
}
```

## Best Practices

1. **Use PHP constants** when appropriate - They're well-tested and standard
2. **Access superglobals safely**: Check for existence before accessing
3. **Use Composer packages**: Leverage the PHP ecosystem
4. **Test compiled output**: Ensure PHP output works as expected

## Examples

### Example: Web Application

```strata
fn handleRequest(): String {
    let method = _SERVER['REQUEST_METHOD'];
    let path = _SERVER['REQUEST_URI'];

    if method == "GET" {
        let name = _GET['name'];
        if name != Null {
            return "Hello, ${name}!";
        }
    }

    return "Hello, World!";
}
```

### Example: File Operations

```strata
fn getConfigPath(): String {
    return __DIR__ + "/config.json";
}

fn loadConfig(): Result<String, String> {
    let path = getConfigPath();
    // file reading logic...
    return Ok(configContent);
}
```

### Example: Environment Variables

```strata
fn getDatabaseUrl(): String? {
    if _ENV["DATABASE_URL"] {
        return _ENV['DATABASE_URL'];
    }

    return Null;
}
```


## Limitations

Current limitations in PHP interop:

1. **Direct PHP class instantiation**: Recommended using `phpInterop: true`.
2. **PHP function calls**: Generic PHP functions might need explicit wrapper functions if their types cannot be inferred.
3. **Complex Type Inference**: Highly dynamic PHP patterns may still require explicit type casting (`as Type`).

These are areas for future enhancement.

## Next Steps

- [PHP Runtime Environment](/language/advanced/php-runtime) - Learn about Strata's runtime and execution model
- [Getting Started](/getting-started/) - Setting up your project
- [Examples](/examples/) - See PHP interop in action
