# Debugging Strata Applications

Strata provides a first-class debugging experience through the official VS Code extension. This guide covers how to set up and use the debugger to inspect your code at runtime.

## Setup

1.  **Configuration**: Ensure your `.strata.json` has `srcDir` defined correctly.
2.  **Launch Configuration**: Add a `launch.json` to your project:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "strata",
      "request": "launch",
      "name": "Debug Current File",
      "program": "${file}"
    }
  ]
}
```

## Features

### Breakpoints

You can set breakpoints on any line of Strata code. The execution will pause, allowing you to inspect the current state.

- **Standard Breakpoints**: Click in the gutter to set a breakpoint.
- **Conditional Breakpoints**: Right-click a breakpoint and select "Edit Breakpoint" to add a condition (e.g., `user.id == 1`).

### Stepping

- **Step In (F11)**: Dive into function calls, including those in imported modules.
- **Step Over (F10)**: Advance to the next line without entering function calls.
- **Step Out (Shift+F11)**: Finish the current function and return to the caller.

### Repeated Execution

Setting a breakpoint on a line that executes multiple times, such as inside a loop, will cause the debugger to pause at each iteration. Strata's expression-level tracing ensures that you can inspect the state during every execution of the line.

### Expression Evaluation

You can evaluate expressions in the **Watch** view or **Debug Console**:
- **Variables**: Inspect local variables (e.g., `user`).
- **Function Calls**: Call PHP built-in functions (e.g., `count($matches)`, `json_encode($data)`).
- **Properties**: Access object properties (e.g., `user.name`).

### Variable Inspection

The **Variables** view in VS Code shows all local variables, including:

- **Primitives**: Strings, Integers, Booleans, etc.
- **Shapes**: Nested key-value pairs.
- **Objects**: Class instances with their properties.

> [!TIP]
> **Constructor Property Visibility**: By default, properties created via constructor promotion (e.g., `class User(name: String)`) are **private**. This means they are encapsulated and hidden from the standard debugger view. To see them in the debugger, you can mark them as `public` explicitly or use the debugger's ability to inspect private members.

### Call Stack

The **Call Stack** view shows the sequence of function calls that led to the current location.

## Server Debugging

To debug a web application running with `strata serve`, follow these steps:

1.  **Start the server with `--debug`**:
    ```bash:no-line-numbers
    strata serve --debug --debug-port=9010
    ```
    This enables the debugger hooks in the compiled code.

2.  **Attach the Debugger**:
    The Strata server will attempt to connect to your editor on port `9010` for *each request*. Ensure your editor is listening.

    In VS Code, use a "Listen" configuration. Add this to your `launch.json`:

    ```json
    {
        "type": "strata",
        "request": "attach",
        "name": "Listen for Strata Server",
        "port": 9010
    }
    ```

> [!TIP]
> Since the debugger connects per-request, you can keep the server running and just attach/detach your debugger as needed. Each new request will check for a debugger connection.

## Troubleshooting

- **Variables show `Array(0)`**: Ensure the properties you want to inspect are `public`.
- **Breakpoints not hitting**: Verify you are running your application in "Debug" mode (using `strata run --debug` or via the VS Code "Start Debugging" button).
- **Empty Call Stack**: Ensure your project is correctly configured and all files are within the `srcDir`.
