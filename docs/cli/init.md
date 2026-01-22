# strata init

Initialize a new Strata project.

## Usage

```bash:no-line-numbers
strata init [options]
```

## Options

- `--force` - Overwrite existing `.strata.json` file if it exists.

## Description

The `init` command sets up a new Strata project by:
1. Creating a `.strata.json` configuration file with default values.
2. Setting up the recommended project structure (`src/` and `build/`).

This is the recommended first step for any new Strata project.

## Examples

```bash:no-line-numbers
# initialize in current directory
strata init

# re-initialize and overwrite config
strata init --force
```
