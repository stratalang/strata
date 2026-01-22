# CLI Application Example

This example shows how to build command-line applications with Strata.

## Basic CLI

A simple command-line program:

```strata
fn main(): Void {
    let args = _SERVER['argv'];  // command-line arguments

    if count(args) < 2 {
        print("Usage: program <command>");
    }

    let command = args[1];

    if command == "hello" {
        print("Hello, World!");
    }

    if command == "version" {
        print("Version 1.0.0");
    }

    print("Unknown command: ${command}");
}
```

## Greeting CLI

A more complete example:

```strata
fn greet(name: String, formal: Bool = false): String {
    if formal {
        return "Good day, ${name}.";
    }

    return "Hey ${name}!";
}

fn main(): Void {
    let args = _SERVER['argv'];

    if count(args) < 2 {
        print("Usage: greet <name> [--formal]");
    }

    let name = args[1];
    let formal = false;

    if count(args) > 2 && args[2] == "--formal" {
        formal = true;
    }

    print(greet(name: name, formal: formal));
}
```

## Calculator CLI

A command-line calculator:

```strata
class CliError(message: String) impl Failure {
    public fn getMessage(): String {
        return this.message;
    }
}

fn calculate(operation: String, a: Float, b: Float): Result<Float, CliError> {
    return match operation {
        "add" => Ok(a + b),
        "subtract" => Ok(a - b),
        "multiply" => Ok(a * b),
        "divide" => {
            if b == 0.0 {
                return Err(CliError(message: "Division by zero"));
            }

            return Ok(a / b);
        },
        default => Err(CliError(message: "Unknown operation: ${operation}")),
    };
}

fn main(): Void {
    let args = _SERVER['argv'];

    if count(args) < 4 {
        print("Usage: calc <operation> <a> <b>");
        print("Operations: add, subtract, multiply, divide");
    }

    let operation = args[1];
    let a = args[2] as Float;
    let b = args[3] as Float;

    try {
        let result = calculate(operation: operation, a: a, b: b);
        print(result);
    } catch (e) {
        print("Error: " . e.getMessage());
    }
}
```

## Todo List CLI

A simple todo list manager:

```strata
class TodoItem(text: String, completed: Bool = false, id: Int = 0) {
    public fn markComplete(): TodoItem {
        return TodoItem(text: this.text, completed: true, id: this.id);
    }

    public fn toString(): String {
        let status = this.completed ? "[x]" : "[ ]";
        return "${status} ${this.text}";
    }
}

class TodoList {
    items: Array<TodoItem> = [];
    nextId: Int = 1;

    public fn add(text: String): Void {
        let item = TodoItem(text: text, id: this.nextId);
        this.items = this.items + [item];
        this.nextId = this.nextId + 1;
    }

    public fn list(): Void {
        if count(this.items) == 0 {
            print("No items");
            return;
        }

        for item in this.items {
            print(item.toString());
        }
    }

    public fn complete(id: Int): Result<Void, CliError> {
        for item in this.items {
            if item.id == id {
                item.completed = true;
                return Ok(());
            }
        }

        return Err(CliError(message: "Item not found"));
    }
}

fn main(): Void {
    let args = _SERVER['argv'];
    let todos = TodoList();

    if count(args) < 2 {
        print("Usage: todo <command> [args]");
        print("Commands: add <text>, list, complete <id>");
    }

    let command = args[1];

    if command == "add" {
        if count(args) < 3 {
            print("Usage: todo add <text>");
        }
        todos.add(text: args[2]);
        print("Added: ${args[2]}");
    }

    if command == "list" {
        todos.list();
    }

    if command == "complete" {
        if count(args) < 3 {
            print("Usage: todo complete <id>");
        }
        let id = args[2] as Int;
        try {
            todos.complete(id: id);
            print("Completed item ${id}");
        } catch (e) {
            print("Error: " . e.getMessage());
        }
    }

    print("Unknown command: ${command}");
}
```

## File Operations

Reading and writing files:

```strata
fn readFile(path: String): Result<String, CliError> {
    // returns Ok(content) or Err(error)
}

fn writeFile(path: String, content: String): Result<Void, CliError> {
    // file writing implementation
    // returns Ok(()) or Err(message)
    return Ok(());
}

fn main(): Void {
    let args = _SERVER['argv'];

    if count(args) < 3 {
        print("Usage: file <command> <path> [content]");
        print("Commands: read, write");
        exit 1;
    }

    let command = args[1];
    let path = args[2];

    if command == "read" {
        try {
            let content = readFile(path: path);
            print(content);
        } catch (e) {
            print("Error: " . e.getMessage());
            exit 1;
        }
    } else if command == "write" {
        if count(args) < 4 {
            print("Usage: file write <path> <content>");
            exit 1;
        }
        try {
            writeFile(path: path, content: args[3]);
            print("File written");
        } catch (e) {
            print("Error: " . e.getMessage());
            exit 1;
        }
    } else {
        print("Unknown command: ${command}");
        exit 1;
    }
}
```

## Best Practices

1. **Validate arguments**: Check argument count and types
2. **Use exit statements**: Use `exit` to terminate the program if needed
3. **Provide help text**: Show usage when arguments are missing
4. **Handle errors gracefully**: Use Result types and try-catch
5. **Use descriptive messages**: Help users understand what went wrong

## Next Steps

- [Web Application](/examples/web-app) - Build web applications
- [Language Reference](/language/) - Learn more Strata features
- [Error Handling](/language/error-handling) - Better error handling
