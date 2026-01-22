# PHP Runtime Environment

Strata is a compiled language that targets the PHP runtime. This allows Strata programs to run on the robust, battle-tested PHP engine while offering modern language features.

## System Requirements

Strata is designed to be self-contained:

- **PHP**: You **do not** need to have PHP installed on your system to run Strata. Strata targets an internal PHP 8.4 runtime if no system PHP is found.
- **Composer**: Composer is **optional**. Strata features a built-in autoloader, so you only need Composer if you intend to use external PHP packages.

## Execution Model

### Native Execution
During development, you can run Strata code directly using the CLI. There is no need for a manual compilation step:

```bash:no-line-numbers
strata run main.str
```

This command handles compilation and execution in a single pass.

### Web Applications
Strata applications fit into the standard request/response lifecycle.

## Server & Deployment

Strata provides flexible options for serving web applications, from local development to high-performance production environments.

### Development (`strata serve`)

For local development, use the `serve` command:

```bash:no-line-numbers
strata serve
```

By default, this command automatically detects if **RoadRunner** is installed.
- **If RoadRunner is found**: It starts a high-performance development server with hot-reloading.
- **If not found**: It falls back to the built-in PHP development server, which is perfect for rapid testing and debugging.

### Production with RoadRunner

Strata has first-class support for [RoadRunner](https://roadrunner.dev/), a high-performance PHP application server.

**Requirements:**
- RoadRunner must be installed in your project.

**Usage:**
The preferred way to run Strata with RoadRunner in production is:

```bash:no-line-numbers
strata serve --production
```

Alternatively, you can manually build and run the worker. Configure your `.rr.yaml` to use the compiled worker:

```yaml
server:
  command: "php build/rr-worker.php"

http:
  address: 127.0.0.1:8000
```

Then run RoadRunner directly:

```bash:no-line-numbers
./rr serve
```

### Production (Standard Web Server)

If you are not using RoadRunner, we **discourage** using `strata serve` in production. Instead, you should build your application and host it using a standard web server like Nginx or Apache.

1.  **Build the project**:
    ```bash:no-line-numbers
    strata build
    ```
2.  **Configure your server**: Point runs your web server (Nginx/Apache) to the `build/` directory (or wherever your entry point is located).

## Configuration

For optimal performance in production (especially when not using `strata serve`), we recommend the following `php.ini` settings:

### OpCache
Enable OpCache to significantly boost performance.

```ini
opcache.enable = 1
opcache.enable_cli = 1
opcache.memory_consumption = 128
opcache.max_accelerated_files = 10000
opcache.validate_timestamps = 0 ; Re-validate files only on deployment
```

### JIT (Just-In-Time) Compiler
PHP 8+ includes a JIT compiler that can further improve performance.

```ini
opcache.jit_buffer_size = 100M
opcache.jit = 1255 ; Tracing JIT
```

## Next Steps

- [PHP Interoperability](/language/advanced/php-interop) - Learn how to use PHP features in Strata
- [Web Server Guide](/guides/web-server) - Deploying Strata applications
- [CLI Commands](/cli/) - Explore CLI tools like `strata run` and `strata serve`
