# Numeric Methods

Methods available on `Int` and `Float` types.

## Integer Methods

### `toFloat`

Converts the integer to a floating-point number.

```strata
fn toFloat(): Float
```

```strata
let count = 10;
let floatCount = count.toFloat(); // 10.0
```

### `toString`

Converts the integer to a string representation.

```strata
fn toString(): String
```

```strata
let answer = 42;
let answerString = answer.toString(); // "42"
```

### `abs`

Returns the absolute value.

```strata
fn abs(): Int
```

```strata
let temperature = -5;
print(temperature.abs()); // 5
```

## Float Methods

### `toInt`

Converts the float to an integer by truncating the decimal part.

```strata
fn toInt(): Int
```

```strata
let price = 3.99;
let basePrice = price.toInt(); // 3
```

### `toString`

Converts the float to a string representation.

```strata
fn toString(): String
```

```strata
let pi = 3.14;
print(pi.toString()); // "3.14"
```

### `round`

Rounds the float to the specified number of decimal places.

```strata
fn round(precision: Int): Float
```

```strata
let pi = 3.14159;
print(pi.round(precision: 2)); // 3.14
```

### `floor`

Rounds down to the nearest integer.

```strata
fn floor(): Float
```

```strata
let rating = 3.9;
print(rating.floor()); // 3.0
```

### `ceil`

Rounds up to the nearest integer.

```strata
fn ceil(): Float
```

```strata
let progress = 3.1;
print(progress.ceil()); // 4.0
```
