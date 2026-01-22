# Error Handling

Strata uses `Result<T, E>` and `Option<T>` types for error handling, combined with try-catch blocks and flow-sensitive type checking for a clean, safe approach.

## Result Type

Functions that can fail return `Result<T, E>`:

- `T` - the success type (the value on success)
- `E` - the error type (Exception, custom exceptions, string, or Failure interface)

**Important:** Try-catch blocks must be inside functions or methods. They cannot be written at the top level of a file. See [Top-Level Code](/language/structure/files.md) for more information.

### Result Constructors

```strata
Ok(value)   // success case
Err(error)  // error case (accepts Exception, Throwable, String, or Failure)
```

The `Err` constructor accepts multiple types:
- **Exception/Throwable**: Any PHP exception class
- **String**: Simple error messages
- **Failure interface**: Custom error types implementing `Failure`

### Automatic Type Coercion

When returning `Ok` or `Err` from a function with a `Result<T, E>` return type, Strata automatically coerces the types:

```strata
fn findUser(id: Int): Result<User, Exception> {
    if id > 0 {
        return Ok(User(id: id));  // Ok<User> → Result<User, Exception>
    }

    return Err(Exception(message: "Invalid ID"));  // Err<Exception> → Result<User, Exception>
}
```

## Option Type

Functions that may not return a value use `Option<T>`:

```strata
Some(value)  // has a value
None         // no value
```

Option types use the same unwrapping and flow-sensitive typing features as Result types.

## Basic Usage

### Returning Results

```strata
fn loadUser(id: Int): Result<User, Exception> {
    if id <= 0 {
        return Err(Exception(message: "Invalid ID"));
    }

    // load user logic...
    return Ok(User(name: "Donald", email: "donaldpakkies@gmail.com"));
}
```

### Handling Results with Try-Catch

In `try` blocks, Result values can be unwrapped using `.value`.

```strata
fn handleUser(): Void {
    try {
        let result = loadUser(id: 1);
        let user = result.value;  // unwraps Ok(user) → user using .value
        print(user.name);         // use the unwrapped value directly
    } catch (exception: Exception) {
        print("Error: " + exception.getMessage());  // handle Err case
    }
}
```

**How it works:**
- `Ok(value)` → access via `.value` property returns the value
- `Err(error)` → accessing `.value` throws the exception
- `catch` blocks handle the exceptions with optional type annotations

### Typed Catch Blocks

You can specify the exception type in catch blocks:

```strata
class UserNotFound : Exception {
}

fn main(): Void {
    let user = findUser(id: 0);

    try {
        user.value.greet();
    } catch (exception: UserNotFound) {  // type annotation for better error handling
        print("User not found: " + exception.getMessage());
    }
}
```

Supported catch syntaxes:
- `catch (exception: ExceptionType)` - typed catch with parentheses
- `catch (exception)` - untyped catch (Mixed type)
- `catch exception` - shorthand without parentheses

## Flow-Sensitive Type Checking

Strata's type checker understands control flow and automatically narrows types based on checks:

### Pattern 1: Direct Checks

```strata
fn getUser(id: Int): Option<User> {
    let user = findUser(id: id);

    if user is Some {
        print(user.value.getName());  // safe: type checker knows user is Some
    }
}
```

### Pattern 2: Negated None Checks

```strata
fn getUser(id: Int): Option<User> {
    let user = findUser(id: id);

    if !(user is None) {
        print(user.value.getName());  // safe: !(is None) means is Some
    }
}
```

### Pattern 3: Early Returns

```strata
fn processUser(id: Int): Void {
    let user = findUser(id: id);

    if user is None {
        return;  // early return
    }

    print(user.value.getName());  // safe: user must be Some here
}
```

### Pattern 4: Negated Some with Else

```strata
fn processUser(id: Int): Void {
    let user = findUser(id: id);

    if !(user is Some) {
        print("No user");
    } else {
        print(user.value.getName());  // safe in else block
    }
}
```

### Pattern 5: Ternary Expressions

```strata
fn processUser(id: Int): Void {
    let user = findUser(id: id);
    let name = user is Some ? user.value.getName() : "Unknown";  // safe
}
```

### Result Type Flow-Sensitive Checking

The same patterns work for `Result<T, E>` types using `Ok` and `Err`:

```strata
fn processResult(): Void {
    let result = compute();

    // pattern: if result is Ok
    if result is Ok {
        print(result.value);  // safe
    }

    // pattern: if !(result is Err)
    if !(result is Err) {
        print(result.value);  // safe
    }

    // pattern: Early return
    if result is Err {
        print("Request failed");
        return;
    }

    // type checker knows result is Ok here
    processData(result.value);
}
```

**Type-Safe Patterns:**
- Option types must use `Some` and `None`
- Result types must use `Ok` and `Err`
- Compiler error if you mix them (e.g., using `Ok` with Option type)

## Unwrapping Results

You can unwrap Result types using either `.value` (inside try blocks or after type checks) or `.unwrap()` (anywhere):

**Inside try blocks - use `.value`:**
```strata
try {
    let result = loadUser(id: 1);
    let user = result.value;  // unwraps Ok(user) → user
    print(user.name);
} catch (exception) {
    print("Error: " + exception.getMessage());
}
```

**After type checks - use `.value`:**
```strata
let result = loadUser(id: 1);
if result is Ok {
    print(result.value.name);  // safe: type checker knows it's Ok
}
```

**Outside try blocks - use `.unwrap()`:**

You can also use the `.unwrap()` method on Result types outside of try blocks. The type checker automatically infers the unwrapped type, allowing method chaining:

```strata
fn findUser(id: Int): Result<User, Exception> {
    if id <= 0 {
        return Err(Exception(message: "User does not exist"));
    }

    return Ok(User(name: "Donald"));
}

fn main(): Void {
    let user = findUser(id: 1);

    // .unwrap() returns the unwrapped type (User), allowing chaining
    print(user.unwrap().getName());  // type checker infers User from unwrap()
}
```

**Important:**
- `.value` works inside `try` blocks or after type-narrowing checks (`is Ok`, `is Some`, etc.)
- `.unwrap()` works anywhere (inside or outside try blocks)
- Both methods return type `T` from `Result<T, E>` or `Option<T>`
- The type checker automatically infers the unwrapped type
- Method chaining works: `result.unwrap().method()` is fully supported
- `.unwrap()` will throw an exception if the Result is `Err` (use try-catch for safer handling)

## Error Types

### Exception Hierarchy

Strata supports the full PHP exception hierarchy:

```strata
// Base Exception
fn test1(): Result<String, Exception> {
    return Err(Exception(message: "Base exception"));
}

// RuntimeException
fn test2(): Result<String, RuntimeException> {
    return Err(RuntimeException(message: "Runtime error"));
}

// InvalidArgumentException
fn test3(): Result<String, InvalidArgumentException> {
    return Err(InvalidArgumentException(message: "Invalid argument"));
}
```

### Custom Exceptions

Create custom exceptions by extending PHP exception classes:

```strata
class UserNotFound : Exception {

}

class ValidationError : RuntimeException {

}

fn loadUser(id: Int): Result<User, UserNotFound> {
    if id <= 0 {
        return Err(UserNotFound(message: "User not found"));
    }

    return Ok(user);
}
```

**Constructor Inheritance:** Classes extending another class without defining their own constructor parameters automatically inherit the parent's constructor:

```strata
// UserNotFound has no constructor params, so it inherits Exception's constructor
class UserNotFound : Exception {
}

// can use with Exception's parameters
UserNotFound(message: "User not found");  // works!
```

### Failure Interface

The `Failure` interface is the recommended standard for custom errors in Strata. Classes implementing `Failure` are automatically compatible with `try-catch` blocks.

```strata
// built-in Failure interface
interface Failure {
    public fn getMessage(): String;
}

// implementation
class UserNotFound(message: String) impl Failure {
    // getMessage() is handled automatically by Strata
}

fn findUser(): Result<User, Failure> {
    return Err(UserNotFound(message: "User not found"));
}

fn main(): Void {
    try {
        let user = findUser();
        print(user.value);
    } catch (failure: Failure) {
        print("Caught failure: " . failure.getMessage());
    }
}
```

**Automatic Behavior:**
When you implement `Failure` (and don't inherit from another class), Strata automatically:
1. Makes your class extend `Exception` (so it can be thrown/caught)
2. Recognizes the `message` constructor parameter and passes it to the `Exception` constructor
3. Implements `getMessage()` for you (via `Exception`)

**Note:** You must use the parameter name `message` for the error message to be correctly handled. Do not attempt to override `getMessage()` manually as it clashes with the underlying `Exception` class.

### String Errors

For simple cases, use strings as errors:

```strata
fn divide(dividend: Float, divisor: Float): Result<Float, String> {
    if divisor == 0.0 {
        return Err("Division by zero");
    }

    return Ok(dividend / divisor);
}
```

## Error Handling Patterns

### Pattern 1: Try-Catch

```strata
fn loadAndDisplayUser(): Void {
    try {
        let user = loadUser(id: 1);
        print("User: ${user.value.name}");
    } catch (exception: Exception) {
        print("Failed to load user: " + exception.getMessage());
    }
}
```

### Pattern 2: Multiple Operations

```strata
fn loadUserData(): Void {
    try {
        let user = loadUser(id: 1);
        let profile = loadProfile(userId: user.value.id);
        let settings = loadSettings(userId: user.value.id);

        print("User: ${user.value.name}");
        print("Profile: ${profile.bio}");
    } catch (exception: Exception) {
        print("Error: " + exception.getMessage());
    }
}
```

### Pattern 3: Early Return

```strata
fn processUser(id: Int): Result<Void, Exception> {
    try {
        let user = loadUser(id: id);
        let validated = validateUser(user: user.value);
        saveUser(user: validated);
        return Ok(());
    } catch (exception: Exception) {
        return Err(exception);
    }
}
```

### Pattern 4: Type-Safe Error Handling

```strata
fn processRequest(): Void {
    let result = makeRequest();

    if result is Err {
        print("Request failed");
        return;
    }

    // type checker knows result is Ok here
    processData(result.value);
}
```

## Error Propagation

Errors automatically propagate in try blocks:

```strata
fn getUserName(id: Int): Result<String, Exception> {
    try {
        let user = loadUser(id: id);  // if this fails, exception is thrown
        return Ok(user.value.name);   // only reached if loadUser succeeds
    } catch (exception: Exception) {
        return Err(Exception(message: "Failed to get user name: " + exception.getMessage()));
    }
}
```

## Custom Error Messages

Create descriptive error messages:

```strata
fn divide(dividend: Float, divisor: Float): Result<Float, String> {
    if divisor == 0.0 {
        return Err("Division by zero: cannot divide ${dividend} by ${divisor}");
    }

    return Ok(dividend / divisor);
}

fn calculateAverage(numbers: Array<Float>): Result<Float, String> {
    if count(numbers) == 0 {
        return Err("Cannot calculate average of empty array");
    }

    let sum: Float = 0.0;
    for number in numbers {
        sum = sum + number;
    }

    return Ok(sum / count(numbers) as Float);
}
```

## Nested Error Handling

Handle errors at different levels:

```strata
fn processOrder(orderId: Int): Result<Void, Exception> {
    try {
        let order = loadOrder(id: orderId);

        try {
            let user = loadUser(id: order.userId);
            processPayment(user: user.value, amount: order.total);
        } catch (e: Exception) {
            return Err(Exception(message: "Payment failed: " + e.getMessage()));
        }

        return Ok(());
    } catch (exception: Exception) {
        return Err(Exception(message: "Order processing failed: " + exception.getMessage()));
    }
}
```

## Error Handling Best Practices

1. **Always handle errors**: Don't ignore Result types
2. **Use descriptive error messages**: Help with debugging
3. **Use type annotations in catch blocks**: `catch (exception: ExceptionType)` for better type safety
4. **Leverage flow-sensitive typing**: Use `is Ok`, `is Err`, `is Some`, `is None` checks
5. **Handle errors at the right level**: Not too early, not too late
6. **Propagate when appropriate**: Let callers handle errors they can fix
7. **Use try-catch for control flow**: It's the idiomatic way in Strata
8. **Remember: try-catch must be inside functions**: Cannot be at the top level.
9. **Use correct patterns for type**: `Some`/`None` for Option, `Ok`/`Err` for Result
10. **Use Failure interface**: Implement `Failure` for custom error types to ensure they integrate well with Strata's error handling.

## Panic

For unrecoverable errors, use `panic()`:

```strata
fn requirePositive(number: Int): Int {
    if number <= 0 {
        panic("Number must be positive, got ${number}");
    }

    return number;
}

// can also panic with Exceptions or Failures
panic(RuntimeException(message: "Critical failure"));
```

The `panic()` function accepts a single positional argument:
- **String**: The error message used directly.
- **Exception/Throwable**: The message is extracted using `.getMessage()`.
- **Failure**: The message is extracted using `.getMessage()`.

**Note:** `panic()` terminates the program. Use only for truly unrecoverable errors.

## Examples

### Example: File Operations

```strata
fn readFile(path: String): Result<String, Exception> {
    // file reading logic...
    if fileNotFound {
        return Err(Exception(message: "File not found: ${path}"));
    }

    if permissionDenied {
        return Err(Exception(message: "Permission denied: ${path}"));
    }

    return Ok(fileContents);
}

fn loadConfig(): Void {
    try {
        let content = readFile(path: "config.json");
        print(content.value);
    } catch (exception: Exception) {
        print("Failed to read file: " + exception.getMessage());
    }
}
```

### Example: API Calls with Custom Exceptions

```strata
class ApiError : RuntimeException {
}

fn fetchUser(id: Int): Result<User, ApiError> {
    // API call logic...
    if apiError {
        return Err(ApiError(message: "API error: ${errorMessage}"));
    }

    return Ok(userData);
}

fn getAndDisplayUser(): Void {
    try {
        let user = fetchUser(id: 1);
        print("User: ${user.value.name}");
    } catch (error: ApiError) {
        print("API call failed: " + error.getMessage());
    }
}
```

### Example: Validation Chain

```strata
fn createUser(name: String, email: String): Result<User, Exception> {
    try {
        let validatedName = validateName(name: name);
        let validatedEmail = validateEmail(email: email);
        let user = User(name: validatedName.value, email: validatedEmail.value);
        saveUser(user: user);
        return Ok(user);
    } catch (exception: Exception) {
        return Err(Exception(message: "User creation failed: " + exception.getMessage()));
    }
}
```

### Example: Flow-Sensitive Typing

```strata
fn processOptionalUser(maybeUser: Option<User>): Void {
    // early return pattern
    if maybeUser is None {
        print("No user provided");
        return;
    }

    // type checker knows maybeUser is Some here
    print(maybeUser.value.getName());
}
```

### Example: Pattern Matching

```strata
fn processResult(result: Result<Data, Exception>): Void {
    match result {
        Ok(data) => processData(data),
        Err(error) => { print("Error occurred: " + error.getMessage()); }
    }
}
```

## Comparison with Other Languages

| Language | Error Handling | Strata Equivalent |
|----------|----------------|-------------------|
| PHP | `throw` / `try-catch` | `Err()` / `try-catch` with types |
| Rust | `Result<T, E>` / `match` | `Result<T, E>` / `match` / `try-catch` + flow-sensitive typing |
| Go | `(value, error)` | `Result<T, E>` |
| TypeScript | `throw` / `try-catch` | `Result<T, E>` / `try-catch` |
| Swift | `Optional<T>` / `Result<T, E>` | `Option<T>` / `Result<T, E>` |

## Important Restrictions

**Try-catch blocks cannot be at the top level**: They must be inside functions or methods.

```strata
// Error: try/catch cannot be at top level
try {
    let user = loadUser(id: 1);
} catch (e) {}

// correct: try/catch inside a function
fn main(): Void {
    try {
        let user = loadUser(id: 1);
        print(user.value.name);
    } catch (exception: Exception) {
        print("Error");
    }
}
```

See [Top-Level Code](/language/structure/files.md) for complete information about what can and cannot be at the top level.

## Next Steps

- [Top-Level Code](/language/structure/files.md) - Understanding top-level restrictions
- [Control Flow](/language/basics/control-flow.md) - Using error handling in control flow
- [Functions](/language/basics/functions.md) - Functions that return Results
- [Types](/language/basics/types.md) - Result and Option type details
