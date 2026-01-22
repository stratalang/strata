# Math

Strata provides a comprehensive set of mathematical functions.

## Basic Functions

- `abs(num)`: Absolute value
- `ceil(num)`: Round up
- `floor(num)`: Round down
- `round(num, precision)`: Round float
- `max(a, b, ...)`: Highest value
- `min(a, b, ...)`: Lowest value

```strata
let val = max(1, 5, 2); // 5
let rounded = round(val: 3.14159, precision: 2); // 3.14
```

## Trigonometry

- `sin(typ)`, `cos(rad)`, `tan(rad)`
- `asin(num)`, `acos(num)`, `atan(num)`
- `deg2rad(deg)`, `rad2deg(rad)`

## Random Numbers

- `rand(min, max)`: Generate a random integer
- `mt_rand(min, max)`: Mersenne Twister random integer

```strata
let diceRoll = rand(min: 1, max: 6);
```

## Constants

- `M_PI`: Pi (3.14159...)
- `M_E`: Euler's number (2.71828...)

## Advanced Math

- `pow(base, exp)`: Exponential expression
- `sqrt(num)`: Square root
- `log(num, base)`: Natural logarithm

```strata
let area = M_PI * pow(base: 5, exp: 2);
```
