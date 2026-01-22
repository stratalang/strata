# strata build

Compile Strata files to PHP.

## Usage

```bash:no-line-numbers
strata build <file> [options]
```

Or, if `entryPoint` is set in `.strata.json`:

```bash:no-line-numbers
strata build [options]
```

## Options

- `--out=DIR` - Output directory (default: `build/`).
- `--output=DIR` - Alias for `--out`.
- `--rr-worker` - Generate RoadRunner worker script for production.
- `--clean` - Clean the build directory before building.
- `--watch` - Watch for changes after the initial build finishes.
- `--verbose, -V` - Show detailed compilation information.

## Description

The `build` command performs full semantic analysis and then emits PHP code to the target build directory. It intelligently skips files whose output is already up to date unless the source has changed.

If `--rr-worker` is provided, Strata generates a `rr-worker.php` script configured to run your application within the RoadRunner high-performance application server.

If `--watch` is provided, the command will perform an initial build and then enter a "watch" loop, automatically recompiling any changed files.

## Examples

```bash:no-line-numbers
# basic build
strata build src/index.str

# build to custom directory
strata build src/index.str --out=dist

# clean build for production with RoadRunner
strata build src/index.str --clean --rr-worker

# build and then keep watching for changes
strata build src/index.str --watch
```
