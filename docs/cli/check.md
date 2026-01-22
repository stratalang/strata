# strata check

The `strata check` command performs a full semantic analysis of your code, including parsing, name resolution, and type checking, without building or executing any code. It is the primary tool for verifying code correctness in development and CI/CD environments.

## Usage

```bash:no-line-numbers
strata check [file] [options]
```

### Arguments

- `file` (Optional): The entry point file to start analysis from. If omitted, Strata looks for `entryPoint` in `.strata.json`, or defaults to `src/index.str` or `index.str`.

### Options

- `--src=DIR`: Specify the source directory containing your Strata files.
- `--entry=FILE`: Explicitly set the entry point file.
- `-q, --quiet`: Suppress all output except for errors.
- `-V, --verbose`: Show detailed analysis progress.

## Features

### Static Type Checking

`strata check` validates all type constraints throughout your application:
- Variable type assignments.
- Function parameter and return types.
- Generics resolution and variance.
- Class property types.

### Null Safety

It ensures that nullable types (`Type?`) are properly handled. The analyzer will flag an error if you try to use a nullable value without checking for `Null` or using a non-null assertion.

### Name Resolution

The command verifies that all symbols (functions, classes, variables) are defined and properly imported. It catches:
- Undefined variable/function usage.
- Duplicate symbol declarations in the same scope.
- Missing or circular imports.

### Control Flow Analysis

The analyzer performs basic control flow checks, such as:
- Ensuring all paths in non-void functions return a value.
- Detecting unreachable code after `return` or `panic`.

## CI/CD Integration

`strata check` is designed to be used in automated pipelines. It returns a non-zero exit code if any semantic errors are found, allowing it to fail a build or Pull Request.

### Example for GitHub Actions

```yaml
- name: Run Strata Type Check
  run: strata check --quiet
```

## Comparison with `build`

| Feature | `strata check` | `strata build` |
|---------|----------------|----------------|
| Parsing | Yes | Yes |
| Type Checking | Yes | Yes |
| Code Generation | **No** | Yes |
| Speed | Faster | Slower |
| Primary Use | CI/CD, Verification | Deployment, Execution |

---

**See Also:**
- [CLI Overview](/cli/) - List of all available commands
- [Error Handling](/language/error-handling) - Understanding analysis errors
- [Configuration Guide](/guides/configuration) - Setting up project defaults
