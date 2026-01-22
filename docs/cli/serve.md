# strata serve

The `strata serve` command starts a development or production server for your Strata application.

## Usage

```bash:no-line-numbers
strata serve <file> [--host=HOST] [--port=PORT] [--production]
```

## Arguments

- `<file>` - The main Strata file to serve (required)

## Options

- `--host=HOST` - Host address to bind to (default: `127.0.0.1`).
- `--port=PORT` - Port number to listen on (default: `8000`).
- `--production` - Use production mode with RoadRunner (requires RoadRunner installed).
- `--debug` - Serve with debugging enabled.
- `--debug-port=PORT` - Port for the debugger to listen on (required if `--debug` is enabled).

## Development Mode

By default, `strata serve` runs in **development mode**:

```bash:no-line-numbers
strata serve server.str
```

### Development Mode Features

- **Automatic recompilation** - Watches for file changes and recompiles automatically
- **RoadRunner (optional)** - Uses RoadRunner if available for better performance
- **PHP Built-in Server (fallback)** - Falls back to PHP's built-in server if RoadRunner is not available
- **Server Code Checks** - Warns you if server-specific globals (like `$_SERVER`, `$_POST`) are used in ways that might cause issues outside of a proper server context.

### RoadRunner in Development

If RoadRunner is installed and configured, development mode will:

1. Compile your Strata code on-the-fly
2. Use RoadRunner for high-performance serving
3. Automatically reload workers when files change
4. Send a `Refresh` header to browsers when changes are detected

**installation:**

```bash:no-line-numbers
# install RoadRunner binary (if not already installed)
# see: https://roadrunner.dev/docs

# install PHP dependencies
composer require spiral/roadrunner-http spiral/roadrunner-worker nyholm/psr7
```

**Configuration:**

Development mode uses `.rr.dev.yaml` for configuration (automatically generated). Your production `.rr.yaml` is preserved and not modified.

### PHP Built-in Server Fallback

If RoadRunner is not available, `strata serve` automatically falls back to PHP's built-in server:

```bash:no-line-numbers
# No RoadRunner installed - uses PHP built-in server
strata serve server.str
# Output:
# ℹ RoadRunner not found.
#    Using PHP built-in server for development.
```

The PHP built-in server provides:
- Basic HTTP serving
- File watching and auto-recompilation
- Suitable for simple development needs

## Production Mode

Production mode uses a **pre-built RoadRunner worker** for optimal performance:

```bash:no-line-numbers
strata serve server.str --production
```

### Production Mode Requirements

1. **Pre-built worker** - Must build the worker first:
   ```bash:no-line-numbers
   strata build server.str --rr-worker
   ```
   This creates `build/rr-worker.php`

2. **RoadRunner configuration** - Must have a `.rr.yaml` file in your project root:
   ```yaml
   version: "3"

   server:
     command: "php build/rr-worker.php"

   http:
     address: "127.0.0.1:8000"
     middleware: []
     pool:
       num_workers: 2
       max_jobs: 0
       allocate_timeout: 60s
       destroy_timeout: 60s

   logs:
     level: error
     output: stdout
     err_output: stderr
   ```

3. **RoadRunner binary and dependencies** - Must be installed:
   ```bash:no-line-numbers
   composer require spiral/roadrunner-http spiral/roadrunner-worker nyholm/psr7
   ```

### Production Mode Behavior

- **Uses pre-built worker** from `build/rr-worker.php`
- **Uses your `.rr.yaml`** configuration (not modified)
- **No file watching** - Optimized for production use
- **No auto-recompilation** - Code must be built first

> [!WARNING]
> **RoadRunner Required:** `strata serve --production` is designed specifically for RoadRunner. If you are not using RoadRunner, we recommend building your project with `strata build` and serving it with a standard web server like Nginx or Apache.

## HTTP Headers and Status Codes

The serve command supports setting HTTP headers and status codes from your Strata application:

```strata
fn main(): Void {
    // set HTTP status code
    http_response_code(201);

    // set HTTP headers
    header("Content-Type: application/json");
    header("X-Custom-Header: value");

    // your response body
    echo json_encode(data: ["name" => "Strata"]);
}
```

Both development and production modes capture:
- HTTP status codes set via `http_response_code()`
- HTTP headers set via `header()`

## Examples

### Basic Development Server

```bash:no-line-numbers
# start development server on default host/port
strata serve app/server.str

# custom host and port
strata serve app/server.str --host=0.0.0.0 --port=3000
```

### Production Server

```bash:no-line-numbers
# 1. build the worker
strata build app/server.str --rr-worker

# 2. start production server (RoadRunner only)
 strata serve app/server.str --production
```

### With RoadRunner

```bash:no-line-numbers
# development (automatic if RoadRunner available)
strata serve server.str
# uses .rr.dev.yaml (auto-generated)

# production (requires pre-built worker)
strata build server.str --rr-worker
strata serve server.str --production
# uses .rr.yaml (your config, not modified)
```

## File Watching

In development mode, `strata serve` watches for changes in:

- Your main Strata file
- All `.str` files in your `src/` directory
- Imported files

When changes are detected:
1. Files are automatically recompiled
2. Server reloads with new code
3. Browser automatically refreshes (via `Refresh` header)

## Configuration Files

### Development: `.rr.dev.yaml`

Automatically generated when using RoadRunner in development mode. Contains:

- Worker script path (temporary directory)
- HTTP server configuration
- Logging configuration

**Note:** This file is automatically cleaned up when the server stops.

### Production: `.rr.yaml`

Your production RoadRunner configuration. **Not modified** by the serve command in production mode.

Example:

```yaml
version: "3"

server:
  command: "php build/rr-worker.php"

http:
  address: "127.0.0.1:8000"
  middleware: []
  pool:
    num_workers: 2
    max_jobs: 0
    allocate_timeout: 60s
    destroy_timeout: 60s

logs:
  level: error
  output: stdout
  err_output: stderr
```

## Troubleshooting

### RoadRunner Not Found

If you see:
```bash:no-line-numbers
error: RoadRunner is required.
```

**In development mode:** The server will automatically fall back to PHP built-in server.

**In production mode:** You must install RoadRunner:
```bash:no-line-numbers
# Install RoadRunner binary
# See: https://roadrunner.dev/docs

# Install PHP dependencies
composer require spiral/roadrunner-http spiral/roadrunner-worker nyholm/psr7
```

### Missing Dependencies

If RoadRunner binary is found but dependencies are missing:

```bash:no-line-numbers
composer require spiral/roadrunner-http spiral/roadrunner-worker nyholm/psr7
```

### Worker Script Not Found (Production)

If you see:
```bash:no-line-numbers
error: Worker script not found: build/rr-worker.php
```

Build the worker first:
```bash:no-line-numbers
strata build server.str --rr-worker
```

### Changes Not Reflecting

**In development mode:**
- Ensure file watching is active (check console output)
- Wait for "Finished recompilation" message
- Browser should auto-refresh (check for `Refresh` header)
- If using RoadRunner, workers reload automatically

**In production mode:**
- Rebuild your code: `strata build server.str --rr-worker`
- Restart the server

### Headers Not Working

Headers set via `header()` are automatically captured in both development and production modes. Ensure:

1. Headers are set before any output
2. Status codes are set via `http_response_code()`
3. Header format is correct: `"Header-Name: value"`

## See Also

- [Web Server Guide](/guides/web-server) - Comprehensive guide to building and deploying web applications
- [CLI Commands Overview](/cli/) - All available CLI commands
- [Web Application Examples](/examples/web-app) - Code examples
- [Getting Started](/getting-started/) - Installation and setup
