# Types

Strata has a powerful type system that ensures safety and correctness. All values have types, and the compiler checks types at compile time.

## Primitive Types

Strata provides these primitive types:

| Type | Description | Example |
|------|-------------|---------|
| `Int` | Signed integer | `42`, `-10` |
| `Float` | Floating-point number | `3.14`, `-0.5` |
| `Bool` | Boolean value | `true`, `false` |
| `String` | UTF-8 string | `"Hello"` |
| `Mixed` | Any value (top type) | `"Luna"`, `42`, `true` |
| `Null` | The null type | `Null` |
| `Void` | No return value | Used for function return types |
| `Never` | Does not return | Used for functions that panic or exit |

### Numeric Types

- **Int**: Represents a 64-bit signed integer. The range is from `-9,223,372,036,854,775,808` to `9,223,372,036,854,775,807` (equivalent to PHP's `int` on 64-bit systems).
- **Float**: Represents a double-precision (64-bit) floating-point number (IEEE 754). Use `Float` for decimal values or numbers requiring fractional precision.

### String Encoding

Strings in Strata are **UTF-8 encoded** by default. String length (`strlen`) and other operations respect multi-byte characters when using the appropriate standard library functions.

## Nullable Types

By default, types are non-nullable. To allow null values, use the `?` suffix:

```strata
let name: String? = Null;
let age: Int? = Null;
```

**Note:** Strata uses `Null` (capitalized) as both the type and value, following the pattern of `None`, `Some`, `Ok`, and `Err`.

### Null Safety

The compiler enforces null checks:

```strata
let name: String? = getUserName();

// Error: name might be Null
print(strlen(name));

// correct: check for Null first
if name != Null {
    print(strlen(name));
}
```

### Null Coalescing Operator

Use `??` to provide a default value:

```strata
let name: String? = getUserName();
let displayName = name ?? "Anonymous";  // String (non-nullable)
```

Chaining requires parentheses:

```strata
let result = (primary ?? secondary) ?? "default";  // correct
let result = primary ?? secondary ?? "default";    // error
```

### Type Guards

Strata supports type narrowing using the `is` operator. This allows you to check if a value is of a specific type, and the compiler will treat it as that type within the conditional block.

```strata
let value: String | Int = ...;

if value is String {
    // 'value' is narrowed to String
    print(value.upper());
} else {
    // 'value' is narrowed to Int
    print(value + 1);
}
```

#### Native Strata Syntax (Recommended)

The preferred way to check types is using the `is` operator followed by the type name:

- `is String`
- `is Int`
- `is Float`
- `is Bool`
- `is Array`
- `is Object`
- `is Null` (or `== Null`)

#### PHP Compatibility & Warnings

For compatibility, Strata also supports standard PHP type checking functions, and they perform the same type narrowing validation:

```strata
if is_string(value) {
    // 'value' is narrowed to String
    print(value.upper());
}
```

Supported functions include `is_string`, `is_int`, `is_float`, `is_bool`, `is_array`, `is_numeric`, `empty`, and `is_null`.

**Note:** Strata encourages using the native `is` syntax. The compiler includes a `LegacyPhpAnalyzer` that can warn you when using PHP-style checks.

You can configure this behavior in `.strata.json`:

```json
{
    "analysis": {
        "phpStyleTypeChecks": "warn" // options: "warn" or "ignore"
    }
}
```

## Option Type

For values that may or may not exist, use `Option<T>`:

```strata
fn findUser(id: Int): Option<User> {
    if id > 0 {
        return Some(User(name: "Luna"));
    }

    return None;
}

let user = findUser(id: 1);
if user is Some {
    print(user.value.getName());
}
```

### Unwrapping Options

You can use the `.unwrap()` method to extract the value from an Option. The type checker automatically infers the unwrapped type:

```strata
fn findUser(id: Int): Option<User> {
    if id > 0 {
        return Some(User(name: "Luna"));
    }

    return None;
}

fn main(): Void {
    let user = findUser(id: 1);

    // .unwrap() returns User, allowing method chaining
    echo user.unwrap().getName();  // type checker infers User
}
```

**Type Inference:**
- `Option<T>.unwrap()` returns type `T`
- Method chaining works: `option.unwrap().method().property`
- Works the same way as `Result<T, E>.unwrap()`

**Warning:** `.unwrap()` will throw an exception if the Option is `None`. Check with `is Some` or use try-catch for safer handling.

## Result Type

For functions that can fail, use `Result<T, E>`:

```strata
class UserError(message: String) impl Failure {
}

fn loadUser(id: Int): Result<User, UserError> {
    if id <= 0 {
        return Err(UserError(message: "Invalid ID"));
    }

    return Ok(User(name: "Luna"));
}

fn handleUser(): Void {
    try {
        let result = loadUser(id: 1);
        let user = result.value;  // unwraps Ok(user) -> user using .value
        print(user.getName());
    } catch (e) {
        print("Error: " . e.getMessage());
    }
}
```

### Unwrapping Results

You can unwrap Result types using either `.value` (inside try blocks) or `.unwrap()` (anywhere):

**Inside try blocks - use `.value`:**
```strata
try {
    let result = loadUser(id: 1);
    let user = result.value;  // unwraps Ok(user) -> user
    print(user.getName());
} catch (e) {
    print("Error: " . e.getMessage());
}
```

**Outside try blocks - use `.unwrap()`:**

You can use the `.unwrap()` method to extract the value from a Result. The type checker automatically infers the unwrapped type:

```strata
fn findUser(id: Int): Result<User, UserError> {
    if id <= 0 {
        return Err(UserError(message: "User does not exist"));
    }

    return Ok(User(name: "Luna"));
}

fn main(): Void {
    let user = findUser(id: 1);

    // .unwrap() returns User, allowing method chaining
    echo user.unwrap().getName();  // type checker infers User
}
```

**Important:**
- `.value` only works inside `try` blocks
- `.unwrap()` works anywhere (inside or outside try blocks)
- Both methods return type `T` from `Result<T, E>`
- The type checker automatically infers the unwrapped type
- Method chaining works: `result.unwrap().method().property` is fully supported
- Works for both `Result<T, E>` and `Option<T>` types
- `.unwrap()` will throw an exception if the Result is `Err` (use try-catch for safer handling)

## Union Types

Union types allow a value to be one of several types:

```strata
let value: String | Int = "Hello";
let number: String | Int = 42;
```

Use type guards to narrow the type:

```strata
let value: String | Int = getUserInput();

if value is String {
    print(strlen(value));  // value is String here
} else {
    print(value + 1);  // value is Int here
}
```

## Intersection Types

Intersection types allow combining multiple types into one, requiring the value to satisfy *all* types:

```strata
interface Loggable {
    public fn log(): Void;
}

interface Serializable {
    public fn serialize(): String;
}

// must implement BOTH Loggable and Serializable
fn process(item: Loggable & Serializable): Void {
    item.log();
    let data = item.serialize();
}
```

## Object Shape Types

Object shape types (or literal types) allow you to define the structure of an object without creating a full class. They are useful for data transfer objects, configuration, or temporary structural requirements.

```strata
let user: { name: String; age: Int; } = ...;
```

### Nullable Fields

Fields in a shape type can be made nullable using the `?` suffix:

```strata
type User = {
    name: String,
    email?: String, // nullable field
    age: Int
};
```

### Index Signatures

If you want to allow an object to have any number of properties with a specific key type and value type, you can use index signatures:

```strata
type Dictionary = {
    [key: String]: String
};
```


## Array Types

Arrays are generic types. Generic type parameters are **optional** - you can use `Array` without type parameters:

```strata
let mixed: Array<String | Int> = ["Luna", 42];
let anyArray: Array = [1, "hello", true];  // accepts any Array<T>

// multi-line arrays with trailing commas
let multiLine: Array<Int> = [
    1,
    2,
    3,
];
```

Trailing commas are supported and recommended for multi-line arrays to keep git diffs clean.

When `Array` is used without type parameters, it accepts any `Array<T>` type. This is useful when the element type is unknown or varies.

### Associative Arrays (Maps)

For key-value pairs:

```strata
let person: Array<String: String | Int> = [
    "name" => "Luna",
    "age" => 6
];

let name: String = person["name"];
```

## Type Inference

Strata can infer types when they're unambiguous:

```strata
let count = 42;        // inferred as Int
let name = "Luna";     // inferred as String
let active = true;     // inferred as Bool
```

You can still provide explicit types:

```strata
let count: Int = 42;
let name: String = "Luna";
```

## Type Casting

Convert between types explicitly:

```strata
let count: Int = 42;
let countStr: String = count as String;
```

## Type Declarations

The `type` keyword is used to create **Type Aliases**. These are top-level declarations that allow you to give a name to any type expression.

Type declarations are essential for documenting complex structures and making your code more expressive. They can appear anywhere at the top level of a file, alongside classes and functions.

```strata
type UserId = Int;
```

## Type Aliases

```strata
type UserId = Int;
type ApiResponse = {
    status: Int,
    message: String,
    data: Mixed
};

let id: UserId = 42;
```

### Generic Type Aliases

Type aliases can have generic parameters, allowing you to define reusable type structures:

```strata
type Box<T> = {
    value: T
};

let stringBox: Box<String> = ...;
```

### Intersection Type Aliases

You can use type aliases to define common intersections:

```strata
type Name = { first: String; last: String; };
type Age = { age: Int; };
type Person = Name & Age;

fn greet(person: Person): Void {
    print("Hello, " . person.first);
}
```

### Shape Constructors

Type aliases that resolve to object shapes can be instantiated using a constructor-like syntax. This provides a convenient way to create objects matching a specific shape.

```strata
type User = {
    name: String,
    age: Int
};

// instantiate using the type name as a constructor
let user = User(name: "Luna", age: 6);

// missing or extra fields are caught at compile time
let u2 = User(name: "Charlie"); // Error: Missing required argument 'age'
```

Generic type aliases can also use this syntax:

```strata
type Box<T> = { value: T }
let intBox = Box(value: 42); // T is inferred as Int
```

## Generic Types

Generic types allow code to work with multiple types:

```strata
// built-in generics
Array<T>
Option<T>
Result<T, E>

// usage
let numbers: Array<Int> = [1, 2, 3];
let maybeName: Option<String> = Some("Luna");
let result: Result<User, UserError> = loadUser(id: 1);
```

## Type Checking

The compiler performs comprehensive type checking at compile time:

```strata
let count: Int = 42;
let name: String = "Luna";

// Error: type mismatch
let sum = count + name;

// correct
let sum = count + 10;
let greeting = "Hello, " . name;
```
### Strict Arithmetic

Strata enforces strict typing for arithmetic operations. You cannot mix `Int` and `Float` without explicit conversion.

```strata
let count = 10;
let factor = 1.5;

// Error: Cannot mix types
let error = count + factor;

// OK: Explicit conversion
let result = count.toFloat() + factor; // count.toFloat() returns Float, matching factor
```

This strictness prevents precision issues and ensures developers are intentional about their numeric types.

### Type Checking Features

- **Return type validation**: All return statements are checked against the function's return type
- **Control flow analysis**: Return statements in if/else, while, foreach, match, and try-catch blocks are validated
- **Function argument validation**: All required parameters must be provided, invalid parameter names are caught
- **Printable type checking**: `echo` and `print` only accept printable types (String, Int, Float, Bool, Mixed, or unions where all members are printable)
- **Type inference for Mixed**: When functions return `Mixed`, the compiler infers actual return types from return statements for better validation

## Next Steps

- [Variables](/language/basics/variables) - Learn about variable declarations
- [Functions](/language/basics/functions.md) - Functions and type annotations
- [Classes](/language/oop/classes.md) - Class types and methods
