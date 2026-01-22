# Code Guidelines

This document outlines recommended coding standards and best practices for writing clean, maintainable Strata code.

## Naming Conventions

### Functions
Use `camelCase` for function names:

```strata
fn getUser(id: Int): User { }
fn calculateTotal(items: Array<Item>): Float { }
fn isValidEmail(email: String): Bool { }
```

### Classes
Use `PascalCase` for class names:

```strata
class UserService { }
class DatabaseConnection { }
class PaymentProcessor { }
```

### Variables
Use `camelCase` for variable names:

```strata
let userName: String = "Luna";
let totalCount: Int = 42;
let isActive: Bool = true;
```

### Constants
Use `UPPER_SNAKE_CASE` for constants:

```strata
const MAX_SIZE: Int = 1000;
const DEFAULT_TIMEOUT: Int = 30;
const API_BASE_URL: String = "https://api.example.com";
```

### Namespaces
Use `PascalCase` with dots for namespaces:

```strata
namespace App.Services;
namespace App.Models;
namespace App.Controllers;
```

## Type Annotations

### Explicit Types
Prefer explicit types for function parameters and return types:

```strata
fn calculateTotal(price: Float, quantity: Int): Float {
    return price * quantity;
}
```

### Type Inference
Use type inference for local variables when the type is obvious:

```strata
// good: type is obvious from the value
let name = "Luna";
let count = 10;
let isActive = true;

// good: explicit type when helpful
let userId: Int = getUser().getId();
```

### Avoid Mixed
Avoid using `Mixed` unless absolutely necessary:

```strata
// avoid
fn process(data: Mixed): Void { }

// prefer
fn process(data: String | Int | Bool): Void { }
```

## Function Design

### Small and Focused
Keep functions small and focused on a single responsibility:

```strata
// good: single responsibility
fn validateEmail(email: String): Bool {
    return strpos(email, "@") !== false && strpos(email, ".") !== false;
}

// avoid: too many responsibilities
fn processUser(user: User): Void {
    // validation, transformation, saving, etc.
}
```

### Descriptive Names
Use descriptive function names that clearly indicate their purpose:

```strata
// good
fn getUserById(id: Int): User { }
fn calculateShippingCost(weight: Float, distance: Int): Float { }

// avoid
fn get(id: Int): User { }
fn calc(w: Float, d: Int): Float { }
```

### Pure Functions
Prefer pure functions when possible (no side effects):

```strata
// good: pure function
fn add(first: Int, second: Int): Int {
    return first + second;
}

// when side effects are needed, make them explicit
fn saveUser(user: User): Result<Void, String> {
    // side effect is clear from the name
}
```

## Code Organization

### One Per File
Keep one class, interface, trait or type per file when possible:

```strata
// UserService.str
namespace App.Services;

class UserService {
    // implementation
}
```

### Group Related Functionality
Group related functions together in classes or modules:

```strata
class MathUtils {
    public static fn add(first: Int, second: Int): Int { }
    public static fn subtract(first: Int, second: Int): Int { }
    public static fn multiply(first: Int, second: Int): Int { }
}
```

### Use Namespaces
Use namespaces to organize code logically:

```strata
namespace App.Models;
class User { }

namespace App.Services;
class UserService { }

namespace App.Controllers;
class UserController { }
```

### Minimal Top-Level Code
Keep the top level for **declarations** only. Execution logic **must** reside inside functions (like `main()`):

```strata
// correct: execution logic is inside a function
fn main(): Void {
    let user = loadUser(id: 1);
    processUser(user: user);
}

// Error: execution logic cannot be at the top level
let user = loadUser(id: 1);  // Error: Standalone call at top level
processUser(user: user);     // Error: Standalone call at top level
```

## Error Handling

### Use Result Types
Use `Result<T, E>` for operations that can fail:

```strata
fn loadUser(id: Int): Result<User, String> {
    if id <= 0 {
        return Err("Invalid user ID");
    }

    return Ok(User(name: "Donald", email: "donaldpakkies@gmail.com"));
}
```

### Handle Errors Explicitly
Always handle errors explicitly; avoid ignoring them:

```strata
// good
fn processUser(id: Int): Void {
    try {
        let result = loadUser(id: id);
        let user = result.value;
        print(user.getName());
    } catch (e) {
        print("Error: " . e.getMessage());
    }
}

// avoid
fn processUser(id: Int): Void {
    let result = loadUser(id: id);
    // error ignored
}
```

### Meaningful Error Messages
Provide meaningful error messages:

```strata
// good
return Err(AppError(message: "User with ID ${id} not found"));

// avoid
return Err(AppError(message: "Error"));
```

## Formatting and Style

Strata enforces consistent formatting standards. Configure formatting in your `.strata.json` file. See the [Configuration Guide](/guides/configuration) for details.

### Default Formatting Standards

Strata uses these defaults across the ecosystem:

- **Indentation Style:** spaces
- **Indentation Size:** 4 spaces
- **Line Endings:** LF (Unix-style)
- **Line Length:** 120 characters

### Consistent Indentation
Use consistent indentation (4 spaces by default):

```strata
fn example(): Void {
    if true {
        print("Indented consistently");
    }
}
```

### Blank Lines
Add blank lines between logical sections:

```strata
class UserService {
    public fn getUser(id: Int): User {
        // implementation
    }

    public fn saveUser(user: User): Void {
        // implementation
    }
}
```

### Line Length
Keep lines to a reasonable length (120 characters by default):

```strata
// good
fn createUser(name: String, email: String, age: Int): User {
    return User(name: name, email: email, age: age);
}

// avoid: too long
fn createUser(name: String, email: String, age: Int, address: String, phone: String, bio: String): User {
    return User(name: name, email: email, age: age, address: address, phone: phone, bio: bio);
}
```

### Automatic Formatting

Use the `strata fmt` command to automatically format your code:

```bash:no-line-numbers
# format all files in current directory
strata fmt

# format a specific file
strata fmt src/index.str

# check formatting without modifying files
strata fmt --check
```

See the [Configuration Guide](/guides/configuration) for formatting options.

### Meaningful Names
Use meaningful variable names; avoid abbreviations:

```strata
// good
let userName: String = "Luna";
let totalPrice: Float = 99.99;

// avoid
let u: String = "Luna";
let tp: Float = 99.99;
```

## Comments

### Document Public APIs
Document public APIs and complex logic:

```strata
/**
 * Loads a user by their unique identifier.
 *
 * @param id The user's unique identifier (must be > 0)
 * @return Result containing the User or an error object
 */
public fn getUserById(id: Int): Result<User, AppError> {
    // implementation
}
```

### Self-Documenting Code
Prefer self-documenting code over comments:

```strata
// good: code is clear
fn calculateTotalPrice(items: Array<Item>): Float {
    let total = 0.0;

    for item in items {
        total = total + item.getPrice();
    }

    return total;
}

// avoid: comment explains what code should make obvious
// loop through items and add up prices
let t = 0.0;
for i in items {
    t = t + i.p;
}
```

### Keep Comments Updated
Keep comments up to date with code changes:

```strata
// this function processes payments (updated when payment logic changed)
fn processPayment(amount: Float): Result<Void, String> {
    // current implementation
}
```

## Imports

### Group Imports
Group imports logically (composer imports, then project imports):

```strata
// composer imports
import Monolog.Level;
import Monolog.Logger;
import Monolog.Handler.StreamHandler;

// project imports
import App.Models.User;
import App.Services.UserService;
```

## Summary

Following these guidelines will help you write clean, maintainable Strata code that is:

- **Readable**: Clear naming and structure
- **Maintainable**: Well-organized and documented
- **Consistent**: Follows established patterns
- **Safe**: Proper error handling and type usage

---

**Next Steps:**
- [Language Reference](/language/) - Learn more about Strata's features
- [Examples](/examples/) - See real-world code examples

