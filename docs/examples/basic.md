# Basic Examples

Simple Strata programs to help you get started.

## Hello World

The simplest program:

```strata
fn main(): Void {
    print("Hello, World!");
}
```

## Variables and Types

Working with different types:

```strata
fn main(): Void {
    let name: String = "Luna";
    let age: Int = 6;
    let isActive: Bool = true;
    let balance: Float = 100.50;

    print("Name: ${name}");
    print("Age: ${age}");
    print("Active: ${isActive}");
    print("Balance: ${balance}");

}
```

## Functions

Defining and calling functions:

```strata
fn greet(name: String): String {
    return "Hello, ${name}!";
}

fn add(a: Int, b: Int): Int {
    return a + b;
}

fn main(): Void {
    let message = greet(name: "Strata");
    print(message);

    let sum = add(a: 5, b: 3);
    print("5 + 3 = ${sum}");

}
```

## Arrays

Working with arrays:

```strata
fn main(): Void {
    let numbers: Array<Int> = [1, 2, 3, 4, 5];

    for number in numbers {
        print(number);
    }

    let names: Array<String> = ["Luna", "Bob", "Charlie"];
    print(names[0]);  // "Luna"

}
```

## Conditionals

Using if-else statements:

```strata
fn checkAge(age: Int): String {
    if age >= 18 {
        return "Adult";
    } elseif age >= 13 {
        return "Teenager";
    } else {
        return "Child";
    }
}

fn main(): Void {
    print(checkAge(age: 20));  // "Adult"
    print(checkAge(age: 15));  // "Teenager"
    print(checkAge(age: 6));   // "Child"
}
```

## Loops

Using while and for-each loops:

```strata
fn main(): Void {
    // while loop
    let count: Int = 0;
    while count < 5 {
        print(count);
        count = count + 1;
    }

    // for-each loop
    let fruits: Array<String> = ["apple", "banana", "orange"];
    for fruit in fruits {
        print(fruit);
    }

}
```

## Match Expressions

Using match for pattern matching:

```strata
fn getStatusMessage(code: Int): String {
    return match code {
        200 => "OK",
        404 => "Not Found",
        500 => "Server Error",
        default => "Unknown",
    };
}

fn main(): Void {
    print(getStatusMessage(code: 200));  // "OK"
    print(getStatusMessage(code: 404));  // "Not Found"
}
```

## Classes

Creating and using classes:

```strata
class Person(name: String, age: Int) {
    public fn introduce(): String {
        return "I'm ${this.name}, ${this.age} years old";
    }
}

fn main(): Void {
    let person = Person(name: "Luna", age: 6);
    print(person.introduce());
}
```

## Error Handling

Using Result types and try-catch:

```strata
class MathError(message: String) impl Failure {
    public fn getMessage(): String {
        return this.message;
    }
}

fn divide(a: Float, b: Float): Result<Float, MathError> {
    if b == 0.0 {
        return Err(MathError(message: "Division by zero"));
    }

    return Ok(a / b);
}

fn main(): Void {
    try {
        let result = divide(a: 10.0, b: 2.0);
        print(result);  // 5.0
    } catch (e) {
        print("Error: " . e.getMessage());
    }

    try {
        let result = divide(a: 10.0, b: 0.0);
        print(result);
    } catch (e) {
        print("Error: " . e.getMessage());  // "Error: Division by zero"
    }

}
```

## Calculator Example

A simple calculator using the functions and error handling shown above:

```strata
fn add(a: Int, b: Int): Int {
    return a + b;
}

fn subtract(a: Int, b: Int): Int {
    return a - b;
}

fn multiply(a: Int, b: Int): Int {
    return a * b;
}

fn main(): Void {
    print("5 + 3 = ${add(a: 5, b: 3)}");
    print("5 - 3 = ${subtract(a: 5, b: 3)}");
    print("5 * 3 = ${multiply(a: 5, b: 3)}");

    // using the divide function from the Error Handling section above
    try {
        let result = divide(a: 10.0, b: 2.0);
        print("10 / 2 = ${result}");
    } catch (e) {
        print("Error: " . e.getMessage());
    }

}
```

## Next Steps

- [Web Application](/examples/web-app) - Build a web application
- [CLI Application](/examples/cli-app) - Create command-line tools
- [Language Reference](/language/) - Learn more about Strata features
