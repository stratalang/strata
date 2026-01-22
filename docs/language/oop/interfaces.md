# Interfaces & Traits

Interfaces and traits provide ways to share behavior and define contracts in Strata.

## Interfaces

Interfaces define contracts that classes must implement. They specify what methods a class must have, but not how to implement them.

### Basic Syntax

```strata
interface Greeter {
    public fn greet(): String;
}

class User(name: String) impl Greeter {
    public fn greet(): String {
        return "Hello, ${this.name}!";
    }
}
```

### Multiple Interfaces

A class can implement multiple interfaces:

```strata
interface Greeter {
    public fn greet(): String;
}

interface Named {
    public fn getName(): String;
}

class User(name: String) impl Greeter, Named {
    public fn greet(): String {
        return "Hello, ${this.name}!";
    }

    public fn getName(): String {
        return this.name;
    }
}
```

### Interface Methods

Interface methods have no body:

```strata
interface Drawable {
    public fn draw(): Void;
    public fn getArea(): Float;
}
```

## Traits

Traits provide reusable behavior that can be shared across classes. Unlike interfaces, traits can have method implementations.

### Basic Syntax

```strata
trait Greeter {
    public fn greet(): String {
        return "Hello!";
    }
}

class User(name: String) with Greeter {
    // User now has the greet() method
}

let user = User(name: "Luna");
print(user.greet());  // "Hello!"
```

### Trait Rules

Traits have specific rules:

1. **No state**: Traits cannot have properties
2. **Behavior only**: Traits provide methods, not data

```strata
// valid trait
trait Loggable {
    public fn log(): Void;
    public static fn info(message: String): Void;
}

// invalid: traits cannot have properties
trait InvalidTrait {
    property: String;  // error
}
```

### Multiple Traits

Classes can use multiple traits:

```strata
trait Greeter {
    public fn greet(): String {
        return "Hello!";
    }
}

trait Logger {
    public fn log(message: String): Void {
        print("[LOG] ${message}");
    }
}

class User(name: String) with Greeter, Logger {
    // User has both greet() and log() methods
}
```

### Overriding Trait Methods

Classes can override trait methods:

```strata
trait Greeter {
    public fn greet(): String {
        return "Hello!";
    }
}

class User(name: String) with Greeter {
    public fn greet(): String {
        return "Hello, ${this.name}!";
    }
}
```

## Interfaces vs Traits

| Feature | Interface | Trait |
|---------|-----------|-------|
| Method implementations | No | Yes |
| Properties | No | No |
| Multiple inheritance | Yes | Yes |
| Purpose | Define contracts | Share behavior |

## Combining Interfaces and Traits

You can use both interfaces and traits together:

```strata
interface Identifiable {
    public fn getId(): Int;
}

trait Timestamps {
    public fn getCreatedAt(): String {
        return "2025-01-01";
    }
}

class User(name: String, id: Int) with Timestamps impl Identifiable {
    public fn getId(): Int {
        return this.id;
    }
}
```

For classes that implement many interfaces or use multiple traits, you can use multi-line declarations:

```strata
class MyController
    with Logger, Greeter, Validator
    impl Controller, JsonSerializable, Dispatchable
{
    // ...
}
```

## Constants

Similarly to classes, both interfaces and traits can define constants:

```strata
interface Protocol {
    const PORT = 8000;
    const TIMEOUT = 30;
}

trait Config {
    const MAX_RETRIES = 3;
}
```

These constants are accessible through any class that implements the interface or uses the trait:

```strata
class MyServer with Config impl Protocol {
}

print(MyServer::PORT);        // 8000
print(MyServer::MAX_RETRIES); // 3
```

## Real-World Examples

### Example: Repository Pattern

```strata
interface Repository<T> {
    public fn find(id: Int): Option<T>;
    public fn save(entity: T): Void;
    public fn delete(id: Int): Void;
}

trait SoftDeletes {
    public fn softDelete(id: Int): Void {
        // implementation
    }

    public fn restore(id: Int): Void {
        // implementation
    }
}

class UserRepository with SoftDeletes impl Repository<User> {
    public fn find(id: Int): Option<User> {
        // implementation
    }

    public fn save(entity: User): Void {
        // implementation
    }

    public fn delete(id: Int): Void {
        // implementation
    }
}
```

### Example: Validation

```strata
class ValidationError(message: String) impl Failure {
}

interface Validatable {
    public fn validate(): Result<Void, ValidationError>;
}

// ...

class User(email: String) with EmailValidator impl Validatable {
    public fn validate(): Result<Void, ValidationError> {
        if !this.isValidEmail(email: this.email) {
            return Err(ValidationError(message: "Invalid email"));
        }

        return Ok(());
    }
}
```

## Best Practices

1. **Use interfaces** to define contracts and ensure classes implement required methods
2. **Use traits** to share common behavior across multiple classes
3. **Keep traits focused** on a single responsibility
4. **Prefer composition**: use traits and interfaces over deep inheritance
5. **Document interfaces**: clearly state what implementing classes must do

## Next Steps

- [Classes](/language/oop/classes.md) - How classes work with interfaces and traits
- [Functions](/language/basics/functions.md) - Method syntax
- [Error Handling](/language/error-handling) - Using Result types in interfaces
