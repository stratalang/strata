# strata watch

Watch files and auto-recompile on changes.

## Usage

```bash:no-line-numbers
strata watch <file> [options]
```

## Options

- `--out=DIR` - Output directory (default: `build/`).
- `--output=DIR` - Alias for `--out`.
- `--clean` - Clean the build directory before starting to watch.
- `--rr-worker` - Generate RoadRunner worker script on changes.
- `--verbose, -V` - Show detailed information on file changes.

The `watch` command starts a persistent process that monitors your source directory for any changes to `.str` files.

When a change is detected, the command automatically recompiles the affected files. Note that `watch` itself does **not** perform an initial build on startup; it only reacts to changes.

To perform a build and then start watching in one go, use:
```bash:no-line-numbers
strata build --watch
```

## Examples

```bash:no-line-numbers
# watch entry point
strata watch src/index.str

# watch and output to custom directory
strata watch src/index.str --out=dist

# watch, generate RoadRunner worker, and clean before start
strata watch src/index.str --clean --rr-worker
```
