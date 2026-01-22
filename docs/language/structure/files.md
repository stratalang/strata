# Top-Level Code

In Strata, the top level of a file is primarily reserved for **declarations**. This encourages better code organization and ensures that execution logic is contained within functions and methods.

## What Can Be at the Top Level

The following declarations are allowed at the top level:

### Declarations
1. **Namespace declarations**: `namespace NamespaceName;`
2. **Imports**: Import declarations `import ...;`
3. **Function declarations**: `fn functionName()`
4. **Class declarations**: `class ClassName()`
5. **Interface declarations**: `interface InterfaceName`
6. **Trait declarations**: `trait TraitName`
7. **Type declarations**: `type TypeAlias = ...;` (see [Types](/language/basics/types.md#type-aliases))
8. **Variable declarations**: `let variableName: Type = value;` (for file-level or global-like variables)

### Simple Statements
9. **Echo/Print**: `echo` or `print()` calls for simple output.
10. **Require**: `require path;` for composition.

**Note:** `echo` and `print` only accept printable types: `String`, `Int`, `Float`, `Bool`, `Mixed`, or union types where all members are printable.

## What Cannot Be at the Top Level

To maintain structure and safety, all control flow and complex execution logic must reside inside functions or methods. The following **cannot** appear at the top level:

- **Control Flow**: `if`, `while`, `for-each`, `match`
- **Error Handling**: `try/catch`, `throw`
- **Control Jump**: `return`, `break`, `continue`, `goto`
- **State Mutation**: Assignment to existing variables (outside of `let` declarations)

## Entry Point: The `main()` Function

For executable logic, the idiomatic pattern is to use a `main()` function. In the **entry file**, this function runs automatically.

```strata
import App.Models.User;

fn main(): Void {
    try {
        let user = loadUser(id: 1);
        print("Hello, ${user.unwrap().name}");
    } catch (exception) {
        print("Error: " . exception.getMessage());
    }
}
```

## Best Practices

1. **Declarations Only**: Keep the top level for defining your program's structure.
2. **Use `main()`**: All entry-point logic should live in `main()`.
3. **Encapsulation**: Organize all complex logic into functions or class methods.

## Summary Table

| Allowed at Top Level | Forbidden at Top Level |
|---------------------|-------------------------|
| `namespace` | `if` / `else` / `match` |
| `import` | `while` / `for-each` |
| `type` | `try` / `catch` / `throw` |
| `fn` / `class` | `return` |
| `interface` / `trait` | `break` / `continue` |
| `let` (declaration) | Assignment (mutation) |
| `print()` / `echo()` | |
| `require` | |
