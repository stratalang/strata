# CLI Commands

The Strata CLI provides tools for project initialization, compilation, and server management.

## Command Overview

| Command | Purpose |
|---------|---------|
| [strata init](/cli/init) | Initialize a new Strata project |
| [strata build](/cli/build) | Compile Strata files (supports `--watch`) |
| [strata serve](/cli/serve) | Start a development or production server |
| [strata check](/cli/check) | Perform semantic analysis without code generation |
| [strata run](/cli/run) | Compile and execute a program immediately |
| [strata watch](/cli/watch) | Watch files and auto-recompile on changes |
| [strata fmt](/cli/fmt) | Format source code according to style rules |
| [strata clean](/cli/clean) | Remove build artifacts |

---

## Global Options

These options can be used with any command:

| Option | Description |
|--------|-------------|
| `-v, --version` | Display Strata version |
| `-V, --verbose` | Show detailed output |
| `-h, --help` | Show help for a command |

---

## Configuration

Strata projects use a `.strata.json` configuration file for project settings and formatting options. CLI flags always override configuration file settings.

**See:** [Configuration Guide](/guides/configuration) for complete documentation.
