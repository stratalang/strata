# Associative Arrays

Associative arrays (also known as Maps or Dictionaries) store data in key-value pairs. In Strata, these are implemented using the native `Array` type, which functions as an ordered map.

## Declaration

You can declare an associative array using the map syntax `[key => value]`:

```strata
let user = [
    "name" => "Luna",
    "role" => "admin"
];
```

## Type Annotation

Strata currently represents associative arrays as `Array<T>`, where `T` is the value type. The keys are assumed to be `String` or `Int`.

```strata
// explicit type for values
let scores: Array<Int> = [
    "player1" => 100,
    "player2" => 200
];
```

## Accessing Values

Access values using the bracket notation `array[key]`:

```strata
let score = scores["player1"];
print(score); // 100
```

## Modifying Values

You can assign new values to existing keys or add new keys:

```strata
// update existing
scores["player1"] = 150;

// add new
scores["player3"] = 50;
```

## Checking Keys

Use the `isset` keyword or check against `Null`.

```strata
if isset(scores["player1"]) {
    // key exists and is not null
}
```

## Iteration

You can iterate over keys and values using `for`:

```strata
for key, value in scores {
    print("${key}: ${value}");
}
```

## Shapes

For data structures with fixed keys and known types, prefer **Shapes** (anonymous structs) over associative arrays:

```strata
type User = {
    name: String,
    age: Int
};

let user = User(name: "Luna", age: 6);
print(user.name);
```
