# Variables

Variables in Strata are declared using the `let` keyword and are type-safe by default. Constants are declared using the `const` keyword and cannot be reassigned.

## Variable Declaration

### Basic Syntax

```strata
let name: String = "Luna";
let age: Int = 6;
let isActive: Bool = true;
```

### Type Inference

When the type is unambiguous, you can omit it:

```strata
let name = "Luna";       // inferred as String
let age = 6;             // inferred as Int
let isActive = true;     // inferred as Bool
```

### Explicit Types

You can always provide explicit types:

```strata
let name: String = "Luna";
let age: Int = 6;
```

## Variable Assignment

Variables declared with `let` can be reassigned **inside functions or methods**:

```strata
fn updateCount(): Void {
    let count: Int = 10;
    count = 20;  // reassign the value
}
```

## Variable Scope

Variables are scoped to the block where they're declared:

```strata
fn example(): Void {
    let globalCount: Int = 10;

    if true {
        let localCount: Int = 20;
        print(globalCount);  // globalCount is accessible
        print(localCount);   // localCount is accessible
    }

    print(globalCount);  // globalCount is accessible
    print(localCount);   // Error: localCount is not in scope
}
```

## Variable Naming

Variable names must:
- Start with a letter or underscore
- Contain only letters, numbers, and underscores
- Be case-sensitive

```strata
let userName = "Luna";     // valid
let user_name = "Luna";    // valid
let _private = "secret";   // valid
let 123name = "invalid";   // invalid: starts with number
```

## Constants

Use `const` to declare constants (values that cannot be reassigned). Constants must be initialized when declared:

```strata
const PI: Float = 3.14159;
const MAX_USERS: Int = 1000;
const APP_NAME = "My Application";  // type can be inferred
```

**Key differences between `let` and `const`:**

- `const` **must** be initialized with a value
- `const` **cannot** be reassigned (compile-time error)
- `let` can be declared without an initial value
- `let` can be reassigned

```strata
// valid: const with initialization
const PI: Float = 3.14159;

// Error: const must be initialized
const MAX_USERS: Int;

// Error: cannot reassign const
fn checkConst(): Void {
    const COUNT: Int = 10;
    COUNT = 20;  // compile-time error
}

// valid: let can be reassigned
fn checkLet(): Void {
    let count: Int = 10;
    count = 20;  // ok
}
```

## Multiple Declarations

You can declare multiple variables:

```strata
let width: Int = 1920;
let height: Int = 1080;
let depth: Int = 32;
```

## Destructuring

Destructuring allows you to extract values from arrays and objects into individual variables using the `destructure` keyword.

### Tuple Destructuring

Destructure arrays (indexed arrays) using parentheses:

```strata
fn example(): Void {
    let coordinates: Array<Int> = [10, 20, 30];
    destructure (x, y, z) = coordinates;
    // x = 10, y = 20, z = 30
}
```

**Skipping Elements:**

You can skip elements by using empty slots (commas without identifiers):

```strata
fn example(): Void {
    let ratings: Array<Int> = [1, 2, 3, 4, 5];
    destructure (first, , third, , fifth) = ratings;
    // first = 1, third = 3, fifth = 5 (skips positions 2 and 4)
}
```

**Rest Operator:**

Use `...rest` to capture remaining elements. The rest operator must be the last element:

```strata
fn example(): Void {
    let numbers: Array<Int> = [1, 2, 3, 4, 5];
    destructure (first, second, ...others) = numbers;
    // first = 1, second = 2, others = [3, 4, 5]
}
```

You can combine empty slots with rest:

```strata
fn example(): Void {
    let matrix: Array<Int> = [10, 20, 30, 40, 50, 60];
    destructure ( , , , ...trailing) = matrix;
    // trailing = [40, 50, 60] (skips first 3 elements)
}
```

### Object Destructuring

Destructure associative arrays (objects) using braces:

```strata
fn example(): Void {
    let user = ["name" => "Luna", "age" => 6, "city" => "Adventure Bay"];
    destructure {name, age} = user;
    // name = "Luna", age = 6
}
```

**Numeric Keys:**

You can destructure numeric keys. If you don't specify a variable name, it auto-generates one:

```strata
fn example(): Void {
    let data = [0 => "first", 1 => "second", 2 => "third"];
    destructure {0, 1, 2} = data;
    // _0 = "first", _1 = "second", _2 = "third"
}
```

Or explicitly name the variable:

```strata
fn example(): Void {
    let data = [0 => "first", 1 => "second"];
    destructure {0 => first, 1 => second} = data;
    // first = "first", second = "second"
}
```

**Empty Slots in Object Patterns:**

Empty slots in object patterns enable positional destructuring (by array values rather than keys):

```strata
fn example(): Void {
    let properties = ["color", "size", "shape"];
    destructure ( , , shape) = properties;
    // shape = "shape" (positional, not key-based)
}
```

**Rest Operator in Object Patterns:**

Use `...rest` to capture remaining properties:

```strata
fn example(): Void {
    let user = ["name" => "Luna", "age" => 6, "city" => "Adventure Bay", "country" => "PP"];
    destructure {name, age, ...details} = user;
    // name = "Luna", age = 6, details = ["city" => "Adventure Bay", "country" => "PP"]
}
```

### Important Notes

- The `destructure` keyword is required (not `let`)
- Tuple patterns use parentheses: `(a, b, c)`
- Object patterns use braces: `{name, age}`
- Empty slots allow skipping elements: `(a, , c)` or `{ , , third}`
- Rest operator (`...rest`) must be the last element
- Rest captures remaining elements/properties as an array
- Object patterns with empty slots use positional destructuring
- Object patterns without empty slots use key-based destructuring
- Numeric keys in object patterns can be explicitly named: `{0 => varName}`

## Type Annotations

Always provide types when:
- The type cannot be inferred
- You want to be explicit for clarity
- Working with complex types

```strata
// type cannot be inferred
let result: Result<User, String> = loadUser(id: 1);

// explicit for clarity
let users: Array<User> = [];
```

## Variable Shadowing

Variables can shadow outer scope variables:

```strata
let name: String = "Luna";

fn example(): Void {
    let name: String = "Ryder";  // shadows outer name
    print(name);  // prints "Ryder"
}

print(name);  // prints "Luna"
```

## Variable Redefinition

In Strata, you cannot redefine a variable within the same scope. Attempting to do so will result in a compile-time error.

```strata
fn example(): Void {
    let score = 10;
    let score = 20;  // Error: Symbol 'score' already defined in this scope
}
```

Strata provides precise error locations for these redefinitions, helping you quickly identify and resolve name collisions in your code.

## Best Practices

1. **Use `const` for values that never change** - this makes your intent clear and prevents accidental reassignment
2. **Use `let` for mutable variables** - when the value may need to change
3. **Use explicit types** for function parameters and return types
4. **Use type inference** for simple local variables
5. **Use descriptive names** that indicate purpose
6. **Avoid shadowing** when possible for clarity

## Built-in Methods

Strata provides built-in methods for primitive types (String, Int, Float) and Arrays. Note that **method calls directly on literals (e.g., `3.toFloat()`) are not allowed** to avoid parsing ambiguity; you must assign the value to a variable first.

For a complete list of available methods, see the [Built-in Methods](/language/std/index.md) reference.

## Top-Level Variables and Constants

**Variable and constant declarations can be at the top level:**

```strata
// correct: let at top level
let name: String = "Luna";

// correct: const at top level
const MAX_SIZE: Int = 1000;

// also correct: let inside a function
fn example(): Void {
    let name: String = "Bob";
    const LOCAL_CONST: Int = 42;
    print(name);
}
```

See [Top-Level Code](/language/structure/files.md) for complete information about what can and cannot be at the top level.

## Next Steps

- [Top-Level Code](/language/structure/files.md) - Understanding top-level restrictions
- [Types](/language/basics/types.md) - Learn about Strata's type system
- [Functions](/language/basics/functions.md) - Functions and parameters
- [Control Flow](/language/basics/control-flow.md) - Using variables in control flow
