# Control Flow

Strata provides various control flow constructs: conditionals, loops, and pattern matching.

## If Statements

### Basic Syntax

```strata
if condition {
    // code
}
```

### If-Else

```strata
if condition {
    // code
} else {
    // code
}
```

### If-Else If-Else

```strata
if condition1 {
    // code
} elseif condition2 {
    // code
} else {
    // code
}
```

### Example

```strata
let age: Int = 20;

if age >= 18 {
    print("Adult");
} elseif age >= 13 {
    print("Teenager");
} else {
    print("Child");
}
```

## While Loops

```strata
while condition {
    // code
}
```

### Example

```strata
let count: Int = 0;

while count < 5 {
    print(count);
    count = count + 1;
}
```

## For-Each Loops

Iterate over arrays:

```strata
for item in array {
    // code
}
```

### Example

```strata
let numbers: Array<Int> = [1, 2, 3, 4, 5];

for number in numbers {
    print(number);
}
```

### With Index

```strata
let names: Array<String> = ["Luna", "Bob", "Charlie"];

for index, name in names {
    print("${index}: ${name}");
}
```

## Match Expressions

Match expressions provide powerful pattern matching capabilities:

```strata
let status = match code {
    200 => "OK",
    404 => "Not Found",
    500 => "Server Error",
    default => "Unknown",
};
```

### Key Features

1.  **Exhaustiveness**: Strata requires `match` expressions to cover all possible cases or include a `default` case. This prevents unhandled scenarios.
2.  **Expression-based**: `match` returns a value, allowing you to assign the result directly to a variable or return it from a function.
3.  **Strict Comparison**: Matches are performed using strict equality (`==`), checking both value and type. For example, `1` will not match `"1"`.


### Example

```strata
fn getStatusMessage(code: Int): String {
    return match code {
        200 => "Success",
        400 => "Bad Request",
        401 => "Unauthorized",
        403 => "Forbidden",
        404 => "Not Found",
        500 => "Internal Server Error",
        default => "Unknown Status",
    };
}
```

## Ternary Operator

The ternary operator provides a concise conditional expression:

```strata
let message = condition ? "Yes" : "No";
```

### Example

```strata
let age: Int = 20;
let status = age >= 18 ? "Adult" : "Minor";
```

## Break and Continue

### Break

Exit a loop early:

```strata
let count: Int = 0;

while true {
    if count >= 10 {
        break;
    }

    count = count + 1;
}
```

### Continue

Skip to the next iteration:

```strata
for number in [1, 2, 3, 4, 5] {
    if number % 2 == 0 {
        continue;
    }

    print(number);  // only prints odd numbers
}
```

## Nested Control Flow

Control flow constructs can be nested:

```strata
for user in users {
    if user.isActive {
        for post in user.posts {
            if post.isPublished {
                print(post.title);
            }
        }
    }
}
```

## Control Flow with Types

### Type Guards

Use type guards to narrow types:

```strata
let value: String | Int = getUserInput();

if value is String {
    print(strlen(value));  // value is String here
} else {
    print(value + 1);  // value is Int here
}
```

### Null Checks

```strata
let name: String? = getUserName();

if name != Null {
    print(strlen(name));  // name is String (not Null) here
}
```

## Pattern Matching

Match expressions are powerful and can destructure `Result` and `Option` types:

### Matching Result

```strata
class UserError(message: String) impl Failure {
    public fn getMessage(): String {
        return this.message;
    }
}

let result: Result<User, UserError> = loadUser(id: 1);

let message = match result {
    Ok(user) => "User: ${user.name}",
    Err(error) => "Error: ${error.getMessage()}",
};
```

### Matching Option

```strata
let maybeUser: Option<String> = findUser(name: "Luna");

let status = match maybeUser {
    Some(name) => "Found user: ${name}",
    None => "User not found",
};
```

## Best Practices

1. **Use match** for multiple conditions instead of long if-else chains
2. **Keep loops simple**: extract complex logic into functions
3. **Use type guards** to narrow types safely
4. **Avoid deep nesting**: use early returns or extract functions
5. **Use descriptive conditions**: make boolean expressions clear

## Examples

### Example: User Validation

```strata
class UserError(message: String) impl Failure {
    public fn getMessage(): String {
        return this.message;
    }
}

fn validateUser(user: User?): Result<User, UserError> {
    if user == Null {
        return Err(UserError(message: "User is required"));
    }

    // validate minimum name length (name is required, so always set)
    if strlen(user.name) < 2 {
        return Err(UserError(message: "Name must be at least 2 characters"));
    }

    // validate email format (email is required, so always set)
    if strpos(user.email, "@") === false {
        return Err(UserError(message: "Invalid email format"));
    }

    return Ok(user);
}
```

### Example: Processing Items

```strata
fn processItems(items: Array<Item>): Void {
    for item in items {
        if !item.isValid {
            continue;
        }

        if item.isProcessed {
            break;
        }

        processItem(item: item);
    }
}
```

### Example: Status Handling

```strata
fn handleStatus(status: String): String {
    return match status {
        "pending" => "Please wait",
        "processing" => "In progress",
        "completed" => "Done",
        "failed" => "Error occurred",
        default => "Unknown status",
    };
}
```

## Important: Top-Level Restrictions

**Control flow statements cannot be at the top level**: They must be inside functions or methods:

- `if/else` at top level
- `while` loops at top level
- `for` loops at top level
- `match` statements at top level

All control flow must be inside functions. See [Top-Level Code](/language/structure/files.md) for details.

## Next Steps

- [Top-Level Code](/language/structure/files.md) - Understanding top-level restrictions
- [Error Handling](/language/error-handling) - Control flow with error handling
- [Functions](/language/basics/functions.md) - Functions and control flow
- [Types](/language/basics/types.md) - Type guards and narrowing
