# Web Server Guide

This guide covers building and deploying web applications with Strata, including development workflows, production deployment, and RoadRunner integration.

## Overview

Strata provides powerful tools for building web applications:

- **Development server** with automatic recompilation
- **Production-ready** deployment with RoadRunner
- **HTTP support** for headers, status codes, and request handling
- **Flexible configuration** for different environments

## Quick Start

### Development

Start a development server:

```bash:no-line-numbers
strata serve server.str
```

The server will:
- Watch for file changes
- Automatically recompile on save
- Reload the application
- Refresh the browser automatically
- **Use RoadRunner** if installed (for better performance)

### Production

Build and serve with RoadRunner:

```bash:no-line-numbers
# build the worker
strata build server.str --rr-worker

# start production server (if RoadRunner is installed)
strata serve server.str --production

# OR (standard deployment)
strata build
# serve 'build/index.php' with Nginx/Apache
```

## Development Workflow

For detailed information about the `strata serve` command, see the [CLI Commands: strata serve](/cli/serve) documentation.

**Quick start:**
```bash:no-line-numbers
strata serve <file> [--host=HOST] [--port=PORT]
```

The development server automatically:
- Watches all `.str` files in your project
- Recompiles when changes are detected
- Reloads the server
- Sends a `Refresh` header to browsers

The server automatically uses RoadRunner if available, otherwise falls back to PHP's built-in server.

## Production Deployment

### Prerequisites

1. **RoadRunner binary** - Install from [roadrunner.dev](https://roadrunner.dev/docs)
2. **PHP dependencies:**
   ```bash:no-line-numbers
   composer require spiral/roadrunner-http spiral/roadrunner-worker nyholm/psr7
   ```
3. **Pre-built worker:**
   ```bash:no-line-numbers
   strata build server.str --rr-worker
   ```

### Configuration

Create a `.rr.yaml` file in your project root. See [CLI Commands: strata serve](/cli/serve) for a complete example configuration.

### Starting Production Server

If RoadRunner is installed:

```bash:no-line-numbers
strata serve server.str --production
```

If RoadRunner is **not** installed, builds should be served using Nginx or Apache pointing to the `build/` directory. `strata serve --production` is discouraged without RoadRunner.

```bash:no-line-numbers
strata serve server.str --production
```

For detailed production mode information, see [CLI Commands: strata serve](/cli/serve).

## HTTP Handling

### Setting Status Codes

Use `http_response_code()` to set HTTP status codes:

```strata
fn main(): Void {
    http_response_code(201);
    echo "Created";
}
```

### Setting Headers

Use `header()` to set HTTP headers:

```strata
fn main(): Void {
    header("Content-Type: application/json");
    header("X-Custom-Header: value");
    echo json_encode(data: ["status" => "ok"]);
}
```

### Request Information

Access request data via superglobals:

```strata
fn main(): Void {
    let method = _SERVER['REQUEST_METHOD'];
    let path = _SERVER['REQUEST_URI'];
    let query = _SERVER['QUERY_STRING'];

    // handle request
    if method == "GET" && path == "/api/users" {
        http_response_code(200);
        header("Content-Type: application/json");
        echo getUsers();
    }
}
```

## RoadRunner Integration

RoadRunner provides high performance, production-ready deployment with persistent worker processes and automatic worker restarts.

For detailed RoadRunner setup, installation, and configuration, see [CLI Commands: strata serve](/cli/serve).

## Best Practices

### Development

1. **Use development mode** for active development:
   ```bash:no-line-numbers
   strata serve server.str
   ```

2. **Keep RoadRunner installed** for better performance and production parity

3. **Watch console output** for compilation status and errors

### Production

1. **Always build first:**
   ```bash:no-line-numbers
   strata build server.str --rr-worker
   ```

2. **Test production mode locally:**
   ```bash:no-line-numbers
   strata serve server.str --production
   ```

3. **Configure workers appropriately** in `.rr.yaml`:
   - `num_workers`: Match your server capacity
   - `max_jobs`: 0 for unlimited (or set a limit)
   - Timeouts: Adjust based on your needs

4. **Set appropriate log levels:**
   ```yaml
   logs:
     level: error  # Use 'error' in production, 'debug' for troubleshooting
   ```

### Code Organization

1. **Separate concerns:**
   - Request handling logic
   - Business logic
   - Response formatting

2. **Use classes for services:**
   ```strata
   class UserService {
       // service logic
   }

   fn main(): Void {
       let service = UserService();
       // handle request with service
   }
   ```

3. **Handle errors gracefully:**
   ```strata
   fn handleRequest(): String {
       try {
           return processRequest();
       } catch (e) {
           http_response_code(500);
           return '{"error": "Internal server error"}';
       }
   }
   ```

## Troubleshooting

For detailed troubleshooting information, see the [Troubleshooting section in CLI Commands: strata serve](/cli/serve#troubleshooting).

## Next Steps

- [CLI Commands: strata serve](/cli/serve) - Detailed command reference
- [Web Application Examples](/examples/web-app) - Code examples
- [Language Reference](/language/) - Learn Strata features
- [RoadRunner Documentation](https://roadrunner.dev/docs) - RoadRunner guide
