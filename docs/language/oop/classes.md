# Classes

Classes in Strata are used to define objects with properties and methods. They support inheritance, traits, and interfaces.

## Class Declaration

### Basic Syntax

```strata
class User(name: String, email: String) {
    public fn greet(): String {
        return "Hello, ${this.name}!";
    }
}
```

- Constructor parameters are declared in the class declaration
- No separate constructor method needed
- Properties are automatically created from constructor parameters

### Readonly Classes

Classes can be marked as `readonly` to make all properties readonly by default:

```strata
readonly class User {
    public name: String;
    private email: String;
}
```

Readonly classes:
- All properties are implicitly readonly
- Cannot have non-readonly properties
- Instances are immutable after creation
- Useful for Value Objects and Data Transfer Objects (DTOs)

You can still use explicit `readonly` on individual properties in non-readonly classes, or combine both:

```strata
readonly class Config {
    public readonly apiKey: String;  // explicit readonly (redundant but allowed)
    public timeout: Int;             // implicitly readonly
}
```

## Instantiation

Classes are instantiated without the `new` keyword:

```strata
let user = User(name: "Donald", email: "donaldpakkies@gmail.com");
```

Named arguments are required:

```strata
// Error: positional arguments not allowed
let manager = Manager("Luna", "Engineering", 5);

// multi-line instantiation with trailing comma
let manager = Manager(
    name: "Luna",
    department: "Engineering",
    teamSize: 5,
);
```

## Properties

### Constructor Properties

Properties are automatically created from constructor parameters. By default, these properties have **private** visibility, keeping them encapsulated within the class.

```strata
class User(name: String, email: String) {
    // name and email are automatically available as this.name and this.email
    // they default to private visibility
}

let user = User(name: "Donald", email: "donaldpakkies@gmail.com");
// print(user.name); // Error: cannot access private property 'name'
```

If you need a different visibility, you can specify it explicitly:

```strata
class User(public name: String, private email: String) {
    // name is public, email is private
}
```

### Additional Properties

You can declare additional properties:

```strata
class User(name: String, email: String) {
    age: Int = 0;
    isActive: Bool = true;
}
```



### Readonly Properties

Properties can be marked as `readonly` to prevent modification after initialization:

```strata
class User(name: String, email: String) {
    public readonly id: String;
    private readonly createdAt: Int;
}

let user = User(name: "Donald", email: "donaldpakkies@gmail.com");
user.id = "new-id";  // Error: Cannot assign to readonly property 'id'
```

Readonly properties:
- Can only be initialized once (usually in constructor)
- Cannot be modified after initialization
- Guarantee immutability for that specific field

## Methods

Methods are functions defined within a class:

```strata
class User(name: String) {
    public fn getName(): String {
        return this.name;
    }

    public fn greet(): String {
        return "Hello, ${this.name}!";
    }
}
```

### The `this` Keyword

Use `this` to refer to the current instance:

```strata
class User(name: String) {
    public fn getName(): String {
        return this.name;
    }
}
```

### Static Methods

Methods can be declared as `static` using the `static fn` syntax:

```strata
class MathUtils {
    public static fn add(first: Int, second: Int): Int {
        return first + second;
    }

    public static fn multiply(first: Int, second: Int): Int {
        return first * second;
    }
}
```

**Static Method Calls:**

Static methods are called using the `::` operator:

```strata
let result = MathUtils::add(first: 5, second: 3);
let product = MathUtils::multiply(first: 4, second: 2);
```

**Self Reference:**

Within a class, you can call static methods using `self::`:

```strata
class Counter {
    private static fn getDefault(): Int {
        return 0;
    }

    public static fn create(): Counter {
        let count = self::getDefault();
        return Counter(count: count);
    }
}
```

**Important Notes:**

- Static methods are declared with `static fn` (static keyword before `fn`)
- Static methods cannot access instance properties or `this`
- Static methods are called using `ClassName::method()` syntax
- `self::method()` can be used within the class to call static methods
- Static methods compile to PHP's `static function` syntax

### Static Properties

Properties can be declared as `static` using the `static` keyword:

```strata
class Counter {
    public static count: Int = 0;
    private static maxCount: Int = 100;
}
```

**Static Property Initialization:**

Static properties with non-nullable types must be initialized at declaration:

```strata
class Config {
    public static apiKey: String = "secret";  // required for non-nullable types
    public static retries: Int?;              // nullable types don't require initialization
}
```

If you want to assign a value later, make the property nullable:

```strata
class User {
    static test: String?;  // can be assigned later
}

fn main(): Void {
    User::test = "Donald";  // assignment works
}
```

**Static Property Access:**

Static properties are accessed using the `::` operator:

```strata
let current = Counter::count;
Counter::count = 5;  // assignment
```

**Self Reference:**

Within a class, you can access static properties using `self::`:

```strata
class Counter {
    public static count: Int = 0;

    public static fn increment(): Void {
        self::count = self::count + 1;
    }
}
```

**Important Notes:**

- Static properties are declared with `static` keyword
- Static properties **cannot** be `readonly` (compile-time error)
- Static properties with non-nullable types **must** be initialized at declaration
- Nullable static properties (`Type?`) don't require initialization
- Static properties are accessed using `ClassName::property` syntax
- Static properties can be assigned using `ClassName::property = value`
- `self::property` can be used within the class to access static properties
- Static properties compile to PHP's `static` keyword syntax

## Constants

Classes can define constants using the `const` keyword. Constants are implicitly static and public.

```strata
class Config {
    const VERSION = "1.0.0";
    const MAX_MEMORY = 512;
}
```

**Accessing Constants:**

Constants are accessed using the `::` operator, similar to static properties:

```strata
print(Config::VERSION);
```

Within a class, `self::` can be used:

```strata
class App {
    const NAME = "MyApp";

    public fn getName(): String {
        return self::NAME;
    }
}
```

Constants can also be defined in interfaces and traits.

## Visibility

All methods and properties must have explicit visibility:

- `public` - accessible from anywhere
- `private` - accessible only within the class
- `protected` - accessible within the class and subclasses

```strata
class User(name: String) {
    public fn getName(): String {
        return this.name;
    }

    private fn validate(): Bool {
        // validate minimum name length and email format
        return strlen(this.name) >= 2 && strpos(this.email, "@") !== false;
    }

    protected fn getInternalId(): String {
        return "user_${this.name}";
    }
}
```

## Generic Classes

Classes can be generic:

```strata
class Box<T>(value: T) {
    public fn getValue(): T {
        return this.value;
    }
}

let intBox = Box(value: 42);      // Box<Int>
let strBox = Box(value: "Hello"); // Box<String>
```

## Inheritance

Strata supports single inheritance using `:`:

```strata
class Person(name: String, age: Int) {
    public fn introduce(): String {
        return "I'm ${this.name}, ${this.age} years old";
    }
}

class User(name: String, age: Int, email: String) : Person {
    public fn getEmail(): String {
        return this.email;
    }
}
```

### Constructor Inheritance

Classes extending another class without defining their own constructor parameters automatically inherit the parent's constructor:

```strata
class Employee(name: String) {
    public fn getName(): String {
        return this.name;
    }
}

class Manager : Employee {
    // inherits constructor from Employee
}

// instantiate Manager using Employee's constructor signature
let manager = Manager(name: "Alice");
```

## Traits

Traits provide reusable behavior (no state):

```strata
trait Greeter {
    public fn greet(): String {
        return "Hello!";
    }
}

class User(name: String) with Greeter {
    // User has the greet() method from Greeter
}

let user = User(name: "Luna");
print(user.greet());  // "Hello!"
```

### Trait Rules

- Traits cannot have state (no properties)
- Multiple traits can be used with `with Trait1, Trait2`

## Interfaces

Interfaces define contracts that classes must implement:

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

Classes can implement multiple interfaces:

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

## Complete Example

```strata
trait Timestamps {
    public fn getCreatedAt(): String {
        return "2025-01-01";
    }
}

interface Identifiable {
    public fn getId(): Int;
}

class Model {
    id: Int = 0;
}

class User(name: String, email: String) : Model with Timestamps impl Identifiable {
    public fn init(): Void {
        this.id = rand();
    }

    public fn getId(): Int {
        return this.id;
    }

    public fn getProfile(): String {
        return "${this.name} (${this.email})";
    }
}

let user = User(name: "Donald", email: "donaldpakkies@gmail.com");
user.init();
print(user.getProfile());
print(user.getCreatedAt());
```

## Best Practices

1. **Use descriptive class names** (PascalCase)
2. **Keep classes focused** on a single responsibility
3. **Use traits** for shared behavior
4. **Use interfaces** to define contracts
5. **Prefer composition** over inheritance when possible

## Next Steps

- [Interfaces & Traits](/language/oop/interfaces.md) - More on interfaces and traits
- [Functions](/language/basics/functions.md) - Method syntax
- [Error Handling](/language/error-handling) - Error handling in classes
