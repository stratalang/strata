# Operators

Strata provides a familiar set of operators with some important modern refinements for type safety.

## Comparison Operators

Equality in Strata is **strict by default**.

| Operator | Description | Logic |
|---|---|---|
| `==` | Strict Equality | Checks if values are equal in both value and type (same as PHP `===`). |
| `!=` | Strict Inequality | Checks if values are not equal (same as PHP `!==`). |
| `<` | Less than | |
| `>` | Greater than | |
| `<=` | Less than or equal to | |
| `>=` | Greater than or equal to | |

```strata
if 1 == "1" {
    // This will NEVER execute because Int(1) != String("1")
}

// Equivalent to === in other languages
if 1 == 1 {
    print("Match!");
}
```

> [!NOTE]
> There is no "loose" equality operator. This design decision prevents common type juggling bugs found in other languages.

## Arithmetic Operators

Standard arithmetic operators are available:

- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `%` Modulo (Remainder)

## String Operators

Strata uses the `+` operator for string concatenation (internally optimized).

```strata
let name = "Strata";
let message = "Hello, " + name + "!"; // "Hello, Strata!"
```

If any operand is a String (or string-like), `+` behaves as concatenation.

## Logical Operators

- `&&` Logical AND
- `||` Logical OR
- `!` Logical NOT

## Null Safety Operators

### Null Coalescing (`??`)

Returns the right-hand operand if the left is `Null` or `None`.

```strata
let name: String? = Null;
let display = name ?? "Guest"; // "Guest"
```

### Optional Chaining (`?.`)

Access properties or methods only if the object is not null.*

> [!NOTE]
> Optional chaining is not yet implemented in Strata.

## Assignment Operators

- `=` Simple assignment
- `+=` Add and assign (or Concat and assign)
- `-=` Subtract and assign
- `*=` Multiply and assign
- `/=` Divide and assign

## Type Operators

### `is` Type Guard

Checks if a value matches a specific type or pattern.

```strata
let value: Mixed = "hello";

if value is String {
    print(value.upper()); // Compiler knows 'value' is String here
}
```

## Range Operator

*Coming soon: `..` for range creation.*
