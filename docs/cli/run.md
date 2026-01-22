# strata run

Compile and execute a Strata program immediately.

## Usage

```bash:no-line-numbers
strata run <file> [--debug] [-- <script-args>]
```

## Options

- `--debug`: Run with debugging enabled.
- `--src`: Specify the source directory path.

## Description

The `run` command is a convenience tool for executing Strata code. It compiles the specified file to an internal memory buffer (or temporary location) and executes it using the PHP runtime (either system PHP or Strata's internal runtime).

Any arguments provided after the file path are passed directly to the executing script and can be accessed via `argv` in Strata.

## Examples

```bash:no-line-numbers
# run a script
strata run src/script.str

# run with arguments
strata run src/script.str --option=value
```
