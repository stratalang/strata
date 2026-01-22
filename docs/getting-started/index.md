# Getting Started with Strata

Welcome to Strata! This guide will help you get up and running with Strata in just a few minutes.

## What You'll Learn

- How to install Strata
- How to write your first program
- Basic concepts and syntax
- How to compile and run Strata code

## Prerequisites

- **Early Access**: Strata is in very early development (pre-alpha). Access requires approval.
- Basic familiarity with programming concepts

## Installation

> **Early Access Required**: Strata is currently in **very early development**: it's not even in alpha yet. Access is limited and requires approval.

To use Strata, please submit a request here: [Request Access](https://app.formbricks.com/s/cmjydyb0s6045ad019rtamvv9)

For detailed information, see the [Installation Guide](/getting-started/installation).

## Your First Program

Create a file called `hello.str`:

```strata
fn main(): Void {
    print("Hello, Strata!");
}
```

Run:

```bash:no-line-numbers
strata run hello.str
```

You should see: `Hello, Strata!`

> **Note:** You can also build to PHP first with `strata build hello.str`, then run the generated PHP file from the `build/` directory. The `run` command is faster for development.

## Understanding the Code

Let's break down what we just wrote:

```strata
fn main(): Void {
```

- `fn` - declares a function
- `main` - the function name (entry point)
- `: Void` - the return type (returns nothing)

```strata
    print("Hello, Strata!");
```

- `print()` - outputs text to the console
- Strings are enclosed in double quotes

The `main()` function returns `Void`.

## Important: Named Arguments Required

In Strata, **all function arguments must be named** when calling functions. Positional arguments are not allowed:

```strata
fn add(a: Int, b: Int): Int {
    return a + b;
}

// correct: named arguments
let sum = add(a: 5, b: 3);

// Error: positional arguments not allowed
let sum = add(5, 3);
```

This also applies to class instantiation:

```strata
class User(name: String, email: String) {
    // ...
}

// correct
let user = User(name: "Donald", email: "donaldpakkies@gmail.com);

// Error: positional arguments not allowed
let user = User("Donald", "donaldpakkies@gmail.com");
```

Named arguments make code more readable and self-documenting. See [Functions](/language/basics/functions.md) for more details.

## Important: Top-Level Code

In Strata, the top level is primarily for **declarations** (functions, classes, types, etc.) and simple setup logic (like `let` definitions and `print`). Complex execution logic like loops, `if/else` statements, and error handling **must** reside inside functions (like `main()`). See [Top-Level Code](/language/structure/files.md) for complete details.

## Next Steps

Now that you've written your first program, explore:

- [Language Reference](/language/) - Learn about types, functions, classes, and more
- [Examples](/examples/) - See real-world code examples
- [Error Handling](/language/error-handling) - Learn how Strata handles errors

---

**Ready to learn more?** Continue to the [Language Reference →](/language/)
