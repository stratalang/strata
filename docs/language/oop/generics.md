# Generics

Strata supports generic type parameters for functions and classes, allowing you to write flexible, reusable code while maintaining type safety.

## Basic Generic Functions

Generic functions use type parameters (like `T`) that are replaced with actual types when the function is called:

```strata
fn identity<T>(value: T): T {
    return value;
}

fn main(): Void {
    let name = identity(value: "Donald");  // T = String
    let num = identity(value: 42);         // T = Int
    let flag = identity(value: true);      // T = Bool
}
```

## Type Inference

Strata automatically infers generic types from function arguments, just like TypeScript:

```strata
fn wrap<T>(value: T): T {
    return value;
}

let input = "Hello";
let result = wrap(value: input);  // type inferred: String
// hover over 'result' shows: String (not T)
```

The compiler infers the type from:
1. **Literal values**: `identity(value: "text")` → `T = String`
2. **Variables**: `identity(value: myVar)` → `T = typeof myVar`
3. **Expressions**: `identity(value: getName())` → `T = return type of getName`

## Explicit Type Arguments

You can explicitly specify type arguments if needed:

```strata
fn identity<T>(value: T): T {
    return value;
}

let result = identity<String>(value: "test");
```

This is useful when:
- The type cannot be inferred from the arguments
- You want to enforce a specific type
- You're calling a function with no parameters

## Default Type Parameters

Generic parameters can have default values:

```strata
fn createArray<T = String>(): Array<T> {
    return [] as Array<T>;
}

let strings = createArray();           // uses default: Array<String>
let numbers = createArray<Int>();      // explicit: Array<Int>
```

Default types are used when:
- No explicit type argument is provided
- The type cannot be inferred from arguments

## Multiple Type Parameters

Functions can have multiple generic type parameters:

```strata
fn pair<T, U>(first: T, second: U): String {
    return (first as String) . ", " . (second as String);
}

fn main(): Void {
    let result = pair(first: "hello", second: 42);
    // T = String, U = Int
    print(result);  // "hello, 42"
}
```

Each type parameter is inferred independently:

```strata
fn combine<A, B, C>(first: A, second: B, third: C): String {
    return (first as String) . (second as String) . (third as String);
}

let result = combine(first: "hi", second: 123, third: true);
// A = String, B = Int, C = Bool
```

## Generic Return Types

When a generic function returns a generic type, the return type is specialized based on the inferred parameters:

```strata
fn getFirst<T>(value: T): T {
    return value;
}

let name: String = getFirst(value: "Donald");  // returns String
let num: Int = getFirst(value: 42);            // returns Int
```

## Generic Classes

Classes can also have generic type parameters:

```strata
class Box<T>(value: T) {
    fn getValue(): T {
        return this.value;
    }
}

fn main(): Void {
    let stringBox = Box(value: "Hello");
    let name = stringBox.getValue();  // type: String

    let intBox = Box(value: 42);
    let num = intBox.getValue();      // type: Int
}
```

## Generic Type Aliases

Type aliases can have generic parameters, allowing you to define reusable type structures:

```strata
type PaginatedResponse<T> = {
    items: Array<T>,
    total: Int,
    page: Int
};

// application
let response: PaginatedResponse<User> = {
    items: [User(name: "Donald")],
    total: 100,
    page: 1
};
```

When a generic type alias is used, the type parameters are specialized just like with generic classes and functions. Generic type aliases are particularly useful for defining data structures, API responses, and complex union types.

## Working with Built-in Generic Types

Strata's built-in types like `Option` and `Result` are generic:

```strata
fn findUser(id: Int): Option<String> {
    if id > 0 {
        return Some(User(id: id));
    }

    return None;
}

fn main(): Void {
    let user = findUser(id: 1);

    match user {
        Some(name) => { print(name); },
        None => { print("Not found"); }
    }
}
```

## Type Casting with Generics

When working with generic types that need to be converted, use type casting:

```strata
fn format<T>(value: T): String {
    return value as String;  // cast T to String
}

fn main(): Void {
    print(format(value: 42));      // "42"
    print(format(value: true));    // "true"
}
```

## Constraints and Limitations

### Current Limitations

1. **No Type Constraints**: Strata doesn't yet support constraints like `T extends Base`
2. **No Variance Annotations**: No support for covariance (`out T`) or contravariance (`in T`)
3. **Runtime Erasure**: Generic types are erased at runtime (compiled to `mixed` in PHP)

### Best Practices

1. **Use Descriptive Names**: `T`, `U`, `V` for short functions; `TKey`, `TValue` for clarity
2. **Prefer Inference**: Let the compiler infer types when possible
3. **Document Constraints**: If a generic type has implicit constraints, document them

```strata
// good: Type parameter is clear from usage
fn findById<T>(id: Int): Option<T> {
    // ...
}

// better: Document what T should be
/**
 * Find an entity by ID.
 * @param T The entity type to return
 */
fn findById<T>(id: Int): Option<T> {
    // ...
}
```

## PHP Code Generation

Generic types are compiled to `mixed` in the generated PHP code:

**Strata:**
```strata
fn identity<T>(value: T): T {
    return value;
}
```

**Generated PHP:**
```php
function identity(mixed $value): mixed {
    return $value;
}
```

This ensures:
- **Type Safety**: Maintained during compilation
- **Runtime Flexibility**: PHP's `mixed` type accepts any value
- **No Performance Overhead**: No runtime type checking

## Examples

### Generic Array Operations

```strata
fn map<T, U>(items: Array<T>, callback: fn(T): U): Array<U> {
    let result: Array<U> = [];
    for item in items {
        result[] = callback(item);
    }
    return result;
}

fn main(): Void {
    let numbers = [1, 2, 3];
    let strings = map(items: numbers, callback: (number) => (number as String));
    // strings: Array<String>
}
```

### Generic Option Helper

```strata
fn unwrapOr<T>(option: Option<T>, default: T): T {
    return match option {
        Some(value) => value,
        None => default
    };
}

fn main(): Void {
    let name = Some("Donald");
    let result = unwrapOr(option: name, default: "Unknown");
    // result: String
}
```

### Generic Builder Pattern

```strata
class Builder<T> {
    items: Array<T> = [];

    fn add(item: T): Builder<T> {
        this.items[] = item;
        return this;
    }

    fn build(): Array<T> {
        return this.items;
    }
}

fn main(): Void {
    let numbers = Builder()
        .add(item: 1)
        .add(item: 2)
        .add(item: 3)
        .build();
    // numbers: Array<Int>
}
```

## Next Steps

- Learn about [Error Handling](../error-handling.md) with generic `Result` types
- Explore [Classes](./classes.md) and how to make them generic
- Read about [Type Safety](../basics/types.md) in Strata
