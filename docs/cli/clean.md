# strata clean

Remove the build directory.

## Usage

```bash:no-line-numbers
strata clean
```

## Description

The `clean` command deletes the entire build directory (configured by `buildDir` in `.strata.json`, default `build/`). Use this to ensure a completely fresh build or to reclaim disk space.

## Examples

```bash:no-line-numbers
# remove build directory
strata clean
```
