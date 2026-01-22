# Examples

This section contains practical examples of Strata code for common use cases.

## Available Examples

- [Basic Examples](/examples/basic) - Simple programs to get started
- [Web Application](/examples/web-app) - Building a web application
- [CLI Application](/examples/cli-app) - Command-line tools

## Quick Examples

### Hello World

```strata
fn main(): Void {
    print("Hello, Strata!");
}
```

### Simple Calculator

```strata
fn add(a: Int, b: Int): Int {
    return a + b;
}

fn main(): Void {
    let result = add(a: 5, b: 3);
    print(result);  // 8
}
```

### User Management

```strata
class User(name: String, email: String) {
    public fn greet(): String {
        return "Hello, ${this.name}!";
    }
}

fn main(): Void {
    let user = User(name: "Donald", email: "donaldpakkies@gmail.com");
    print(user.greet());
}
```

## Running Examples

1. Save the code to a `.str` file
2. Compile: `strata build example.str`
3. Run: `php build/example.php`

## Contributing Examples

Have a great example? Consider contributing it to help others learn Strata!

---

**Explore the examples** by clicking on the topics above.
