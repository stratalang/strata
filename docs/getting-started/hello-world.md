# Your First Program

In this guide, you'll write your first Strata program and learn the basics of the language.

## The Hello World Program

Let's start with the classic "Hello, World!" program:

```strata
fn main(): Void {
    print("Hello, World!");
}
```

Save this as `hello.str` and run it:

```bash:no-line-numbers
strata run hello.str
```

Output: `Hello, World!`

> **Tip:** The `strata run` command compiles and executes your code in one step, making it perfect for development. Alternatively, you can build first with `strata build hello.str`, then run the compiled output with `php build/hello.php` (if you have PHP installed).

## Understanding the Code

### Function Declaration

```strata
fn main(): Void {
```

- `fn` - keyword to declare a function
- `main` - function name (the entry point)
- `: Void` - return type (returns nothing)
- `{` - start of function body

### The print Statement

```strata
    print("Hello, World!");
```

- `print()` - built-in function to output text
- `"Hello, World!"` - a string literal
- Semicolons are required at the end of statements

### Return Statement

The `main()` function returns `Void`.

## A More Complex Example

Let's create a program that does more:

```strata
fn greet(name: String): String {
    return "Hello, ${name}!";
}

fn main(): Void {
    let message = greet(name: "Strata");
    print(message);
}
```

### Breaking It Down

**Function with Parameters:**

```strata
fn greet(name: String): String {
```

- `name: String` - parameter named `name` of type `String`
- `: String` - function returns a `String`
- Named arguments are required when calling

**String Interpolation:**

```strata
return "Hello, ${name}!";
```

- `${name}` - interpolates the variable `name` into the string
- Similar to PHP's `"Hello, {$name}!"`

**Variable Declaration:**

```strata
let message = greet(name: "Strata");
```

- `let` - declares a variable
- Type is inferred from the function return type
- Could also write: `let message: String = greet(name: "Strata")`

**Function Call:**

```strata
greet(name: "Strata");
```

- Named arguments are mandatory
- `name:` specifies which parameter you're passing

## Top-Level Code

**Important:** In Strata, the top level of a file is primarily for **declarations**. All complex logic must reside inside functions.

**Allowed at top level:**
- Namespace declarations (`namespace`)
- Import statements (`import`)
- Type declarations (`type`)
- Function declarations (`fn`)
- Class, Interface, and Trait declarations (`class`, `interface`, `trait`)
- `let` variable declarations (definitions only)
- `echo` and `print` statements

**Forbidden at top level (must be inside functions):**
- Control flow: `if/else`, `match`
- Loops: `while`, `for-each`
- Error handling: `try/catch`, `throw`
- State mutation: Assignment to existing variables (`x = y`)
- Standalone expressions (like calling a function without `print`)

See [Top-Level Code](/language/structure/files.md) for complete details.

## Key Concepts

### 1. Type Safety

Strata is statically typed, with explicit types where required and inference where possible:

```strata
let count: Int = 10;        // correct
let count = 10;             // also correct (type inferred)
let count: String = 10;     // error: type mismatch
```

### 2. Named Arguments

All function arguments must be named:

```strata
fn add(a: Int, b: Int): Int {
    return a + b;
}

// correct
let sum = add(a: 5, b: 3);

// Error: positional arguments not allowed
let sum = add(5, 3);
```

### 3. Semicolons Required

Strata requires semicolons at the end of statements (like PHP):

```strata
print("Hello");  // semicolon required
print("World");  // also required
```

## Exercises

Try these exercises to practice:

1. **Greet Multiple People**: Create a function that greets multiple people
2. **Calculator**: Create functions for add, subtract, multiply, and divide
3. **Temperature Converter**: Convert Fahrenheit to Celsius

## Next Steps

- [Types](/language/basics/types.md) - Learn about Strata's type system
- [Functions](/language/basics/functions.md) - Deep dive into functions
- [Examples](/examples/) - See more code examples

---

**Ready to learn more?** Check out the [Language Reference →](/language/)
