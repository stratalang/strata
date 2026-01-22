# strata fmt

Format Strata source files.

## Usage

```bash:no-line-numbers
strata fmt [path] [options]
```

## Options

- `--check` - Check if files are correctly formatted without modifying them. Returns exit code 1 if formatting is required.
- `--verbose, -V` - Show list of formatted files.

## Description

The `fmt` command automatically formats your Strata source code according to the project's style guidelines. It uses the `fmt` configuration blocks in `.strata.json` to determine indentation size, line lengths, and other stylistic preferences.

If no path is provided, it formats all files within the source directory (`srcDir`).

## Examples

```bash:no-line-numbers
# format all files in src/
strata fmt

# format a specific file
strata fmt src/User.str

# check formatting in CI
strata fmt --check
```
