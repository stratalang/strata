# Input & Output

Strata provides comprehensive Input/Output capabilities, allowing you to interact with the console, file system, and data streams. These functions are part of the standard library and are available globally.

## Console Output

### Standard Output

You can print text to the standard output (stdout) using `print` or `echo`.

#### `print`

`print` is a function that outputs a string or value.

```strata
fn print(value: String): Void
```

```strata
print("Hello, Strata!");
// Output: Hello, Strata!
```

#### `echo`

`echo` is a language construct that outputs one or more strings.

```strata
echo "Status: ", "Active", "\n";
```

### Formatting Output

Strata uses string interpolation as the primary way to format output. This is clearer and safer than standard format strings.

```strata
let name = "Luna";
let score = 100;

print("Player ${name} scored ${score} points.");
```

For advanced formatting (like separate decimal places or padding), you can use the `sprintf` function:

```strata
fn sprintf(format: String, ...values: Mixed): String
```

```strata
let pi = 3.14159;
let formatted = sprintf(format: "Pi is approximately %.2f", values: pi);
print(formatted); // "Pi is approximately 3.14"
```

## Console Input

### Reading User Input

To read input strictly from the command line, use the `readline` function. It pauses execution and waits for the user to type a line of text.

```strata
fn readline(): String
```

```strata
print("Please enter your name: ");
let name = readline() as String;

print("Hello, ${name}!");
```

## File I/O

Strata provides a robust set of functions for working with files, tailored for performance and reliability.

### Reading Files

The simplest way to read a file is `file_get_contents`, which reads the entire file into a string.

```strata
fn file_get_contents(filename: String): String
```

```strata
let path = "config.json";

if file_exists(path) {
    let content = file_get_contents(filename: path);
    print("File size: " . strlen(content));
} else {
    print("Error: File not found.");
}
```

### Writing Files

`file_put_contents` writes data to a file. It creates the file if it doesn't exist and overwrites it if it does.

```strata
fn file_put_contents(filename: String, data: String, flags: Int = 0): Int
```

```strata
let logMessage = "[INFO] Application started.\n";
file_put_contents(filename: "app.log", data: logMessage);
```

To append to a file instead of overwriting, you can use the `FILE_APPEND` flag:

```strata
file_put_contents(filename: "app.log", data: "New entry.\n", flags: FILE_APPEND);
```

### Advanced File Operations

For processing large files line-by-line or handling binary data, use file handles (`fopen`, `fgets`, `fclose`).

#### Reading Line-by-Line

```strata
let handle = fopen("large_data.txt", "r");

if handle {
    while !feof(handle) {
        let line = fgets(handle);
        if line {
            print("Line: ${line}");
        }
    }
    fclose(handle);
}
```

## Standard Streams

Strata allows direct interaction with standard input, output, and error streams using special stream URIs: `php://stdin`, `php://stdout`, and `php://stderr`.

### Writing to Stderr

It is best practice to write error messages to `stderr` so they can be separated from normal program output.

```strata
let stderr = fopen("php://stderr", "w");
fwrite(stderr, "Critical Error: Database connection failed.\n");
fclose(stderr);
```
