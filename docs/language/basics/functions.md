# Functions

Functions in Strata are declared using the `fn` keyword and must have explicit return types.

## Function Declaration

### Basic Syntax

```strata
fn greet(name: String): String {
    return "Hello, ${name}!";
}
```

- `fn` - function keyword
- `greet` - function name
- `(name: String)` - parameter with type
- `: String` - return type
- `{ ... }` - function body

## Named Arguments

**All function arguments must be named** when calling:

```strata
fn add(first: Int, second: Int): Int {
    return first + second;
}

// correct: named arguments
let sum = add(first: 5, second: 3);

// Error: positional arguments not allowed for Strata code
let sum = add(5, 3);
```

### PHP Interoperability

When calling PHP built-in functions (like `strlen` or `array_map`), positional arguments are allowed for compatibility. However, when calling methods from your PHP source files via interop, named arguments are required to maintain consistency with Strata standards.

```strata
// PHP built-ins: positional allowed
let len = strlen("test");

// PHP source: named required
let user = User.find(id: 1);
```

### Parameter Validation

The compiler enforces strict parameter validation:

```strata
fn greet(name: String, age: Int, title: String? = Null): String {
    return "Hello, ${name}";
}

// correct: all required parameters provided
greet(name: "Luna", age: 6);

// correct: optional parameter provided
greet(name: "Luna", age: 6, title: "Master");

// Error: missing required parameter 'age'
greet(name: "Luna");

// Error: invalid parameter name 'invalid'
greet(name: "Luna", age: 6, invalid: "value");
```

- All required parameters (those without default values) must be provided
- Invalid parameter names are caught at compile time
- Missing required parameters result in compile-time errors

## Default Parameters

Functions can have default parameter values. **Parameters with default values must come after all required parameters** (those without defaults):

```strata
// correct: default parameters come last
fn greet(name: String, excited: Bool = false): String {
    if excited {
        return "Hey ${name}!";
    }

    return "Hello ${name}";
}

// use default value
greet(name: "Luna");  // "Hello Luna"

// override default
greet(name: "Luna", excited: true);  // "Hey Luna!"
```

### Parameter Ordering Rules

```strata
// valid: all required parameters first, then defaults
fn createUser(name: String, email: String, role: String = "user", active: Bool = true): User {
    return User(name: name, email: email, role: role, active: active);
}

// invalid: default parameter before required parameter
fn createUser(name: String, role: String = "user", email: String): User {
    // Error: required parameter 'email' cannot come after default parameter 'role'
    return User(name: name, email: email, role: role);
}

// valid: calling with only required parameters
createUser(name: "Donald", email: "donaldpakkies@gmail.com");

// valid: calling with some optional parameters
createUser(name: "Donald", email: "donaldpakkies@gmail.com", role: "admin");

// valid: calling with all parameters
createUser(name: "Donald", email: "donaldpakkies@gmail.com", role: "admin", active: false);
```

## Return Types

All functions must declare a return type:

```strata
fn getCount(): Int {
    return 42;
}

fn getName(): String {
    return "Luna";
}

fn doNothing(): Void {
    // no return needed
}
```

### Never Return Type

Functions that never return (panic or exit) use `Never`:

```strata
fn panic(message: String): Never {
    panic(message);
}
```

## Function Parameters

### Multiple Parameters

```strata
fn createUser(name: String, email: String, age: Int): User {
    return User(name: name, email: email, age: age);
}
```

### Multi-line Calls & Trailing Commas

Strata supports multi-line function calls and parameters. When a call or declaration spans multiple lines, you can include a trailing comma after the last item. This is considered best practice as it makes version control diffs cleaner and allows for easier reordering of items.

```strata
// multi-line declaration with trailing comma
fn createConfig(
    timeout: Int,
    apiKey: String,
    debugMode: Bool,
): Void {
    // ...
}

// multi-line call with trailing comma
// multi-line call with trailing comma
createConfig(
    timeout: 3000,
    apiKey: "sk-...",
    debugMode: true,
);
```

The Strata formatter will automatically add trailing commas to multi-line constructs if enabled in your configuration.

### Optional Parameters

Use nullable types or `Option<T>` for optional parameters:

```strata
fn greet(name: String, title: String? = Null): String {
    if title != Null {
        return "Hello, ${title} ${name}!";
    }

    return "Hello, ${name}!";
}

greet(name: "Luna");  // "Hello, Luna!"
greet(name: "Luna", title: "Master");  // "Hello, Master Luna!"
```

## First-Class Functions

Functions are first-class values and can be passed as arguments using the `Callable` type:

```strata
fn apply(func: Callable, value: Int): Mixed {
    return func(value);
}

fn double(number: Int): Int {
    return number * 2;
}

let result = apply(func: double, value: 5);  // 10
```

## Generic Functions

Functions can be generic, allowing them to work with any type:

```strata
fn identity<T>(value: T): T {
    return value;
}

let num = identity(value: 42);       // T inferred as Int
let str = identity(value: "hello");  // T inferred as String
```

You can also restrict generics with type bounds (using unions or intersections):

```strata
fn printValue<T>(value: T): Void {
    print(value);
}
```

### Function Type Parameters

When declaring a function parameter that accepts another function, use the `Callable` type:

```strata
// function that accepts a Callable
fn processValue(operation: Callable, num: Int): Mixed {
    return operation(num);
}

// call with a lambda
let doubled = processValue(
    operation: (value: Int): Int => value * 2,
    num: 5
);  // 10

// call with a named function
fn square(number: Int): Int {
    return number * number;
}

let squared = processValue(operation: square, num: 5);  // 25
```

**Key Points:**
- Use `Callable` type for function parameters
- Return type is typically `Mixed` since `Callable` doesn't specify the exact signature
- Both lambdas and named functions can be passed as `Callable` arguments
- Lambdas can be stored in variables typed as `Callable`


## Lambda Functions

Create anonymous functions (closures) with lambda syntax. Lambdas automatically capture variables from outer scopes.

### Expression-Bodied Lambdas

For simple single-expression lambdas:

```strata
let numbers: Array<Int> = [1, 2, 3, 4, 5];

// multiply each element by 2
let doubled = array_map((number: Int): Int => number * 2, numbers);
```

**Syntax:** `(param: Type, ...) : ReturnType? => expression`

- Parameters must be explicitly typed
- Return type is optional (inferred from expression)
- Automatically captures outer variables (no `use` clause needed)
- Compiles to PHP arrow functions: `fn (...) => ...`

### Block-Bodied Lambdas

For multi-statement lambdas with explicit returns:

```strata
let numbers: Array<Int> = [1, 2, 3, 4];

let total: Int = array_reduce(
    numbers,
    (carry: Int, item: Int): Int => {
        let next = carry + item;
        return next;
    },
    0
);
```

**Syntax:** `(param: Type, ...) : ReturnType? => { statements }`

- Block body allows multiple statements
- Must have explicit `return` statement
- Return type must match declared return type
- Automatically captures outer variables with `use (...)` clause
- Compiles to PHP closures: `function (...) use (...) { ... }`

**Note on Immutability:** Lambda parameters (like all function parameters in Strata) cannot be reassigned within the body. If you need to accumulate a value, use a new variable:

```strata
// invalid: carry = carry + item;
// correct:
let next = carry + item;
return next;
```

### Variable Capture

Lambdas automatically capture variables from outer scopes:

```strata
fn main(): Void {
    let x: Int = 7;

    // expression lambda: automatically captures x
    let addX: Callable = (n: Int): Int => x + n;

    // block lambda: automatically captures x with use($x)
    let multiplyX: Callable = (n: Int): Int => {
        return x * n;
    };

    print(addX(n: 3));        // 10
    print(multiplyX(n: 3));   // 21
}
```

**Capture Rules:**
- Variables referenced in lambda body are automatically captured
- Expression lambdas: captured by value (PHP arrow functions)
- Block lambdas: captured by value with `use ($var)` clause
- Parameters and local variables in lambda are not captured
- Global variables and constants are not captured

### Empty Parameter Lists

Lambdas can have empty parameter lists:

```strata
let getValue: Callable = (): String => "value";
let getValueBlock: Callable = (): String => {
    return "value";
};
```

### Examples

**With PHP array functions:**

```strata
// array_map
let numbers: Array<Int> = [1, 2, 3, 4, 5];
let doubled = array_map((n: Int): Int => n * 2, numbers);

// array_reduce with block body
let total: Int = array_reduce(
    numbers,
    (carry: Int, item: Int): Int => {
        return carry + item;
    },
    0
);

// array_filter
let evens = array_filter(numbers, (n: Int): Bool => n % 2 == 0);
```

## Function Overloading

Strata does not support function overloading. Each function name must be unique within its scope.

## Recursion

Functions can call themselves:

```strata
fn factorial(n: Int): Int {
    if n <= 1 {
        return 1;
    }

    return n * factorial(n: n - 1);
}
```

## Visibility

Functions can have visibility modifiers (in classes):

```strata
class User(name: String) {
    public fn getName(): String {
        return this.name;
    }

    private fn validate(): Bool {
        // validate minimum name length (name is required, so always set)
        return strlen(this.name) >= 2;
    }
}
```

## Best Practices

1. **Use descriptive names** that indicate what the function does
2. **Keep functions small** and focused on one task
3. **Use named arguments** for clarity (mandatory in Strata)
4. **Document complex functions** with comments
5. **Return early** to reduce nesting

## Examples

### Simple Function

```strata
fn square(number: Int): Int {
    return number * number;
}

let result = square(number: 5);  // 25
```

### Function with Multiple Parameters

```strata
fn calculateTotal(price: Float, quantity: Int, discount: Float = 0.0): Float {
    let subtotal = price * quantity as Float;
    return subtotal * (1.0 - discount);
}

let total = calculateTotal(price: 10.0, quantity: 3, discount: 0.1);  // 27.0
```

### Function Returning Result

```strata
class MathError(message: String) impl Failure {
}

fn divide(dividend: Float, divisor: Float): Result<Float, MathError> {
    if divisor == 0.0 {
        return Err(MathError(message: "Division by zero"));
    }

    return Ok(dividend / divisor);
}

fn calculate(): Void {
    try {
        let result = divide(dividend: 10.0, divisor: 2.0);
        print(result);  // 5.0
    } catch (e) {
        print("Error: " . e.getMessage());
    }
}
```

## Generic Functions

Functions can have generic type parameters that make them work with different types:

```strata
fn identity<T>(value: T): T {
    return value;
}

fn main(): Void {
    let name = identity(value: "Donald");  // T = String
    let num = identity(value: 42);         // T = Int
}
```

Generic types are automatically inferred from the arguments:

```strata
fn wrap<T>(value: T): T {
    return value;
}

let input = "Hello";
let result = wrap(value: input);  // type inferred: String
```

You can also specify type arguments explicitly:

```strata
let result = identity<String>(value: "test");
```

Generic functions can have default type parameters:

```strata
fn createArray<T = String>(): Array<T> {
    return [] as Array<T>;
}

let strings = createArray();           // uses default: Array<String>
let numbers = createArray<Int>();      // explicit: Array<Int>
```

For more details, see the [Generics](/language/oop/generics.md) documentation.

## Next Steps

- [Generics](/language/oop/generics.md) - Generic type parameters in detail
- [Classes](/language/oop/classes.md) - Methods in classes
- [Control Flow](/language/basics/control-flow.md) - Using functions in control flow
- [Error Handling](/language/error-handling) - Error handling with functions
