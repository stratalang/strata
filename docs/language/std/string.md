# String Methods

Methods available on `String` types.

## Inspection

### `count`

Returns the total number of characters in the string.

```strata
fn count(): Int
```

```strata
let greeting = "hello";
print(greeting.count()); // 5
```

### `indexOf`

Returns the index of the first occurrence of `sub`, or `Null` if not found.

```strata
fn indexOf(sub: String): Int|Null
```

```strata
let sentence = "hello world";
print(sentence.indexOf(sub: "world")); // 6
print(sentence.indexOf(sub: "mars"));  // null
```

### `contains`

Checks if the string contains the specified substring.

```strata
fn contains(sub: String): Bool
```

```strata
let sentence = "hello world";
if sentence.contains(sub: "hello") {
    print("Found!");
}
```

### `startsWith`

Checks if the string begins with the specified substring.

```strata
fn startsWith(sub: String): Bool
```

```strata
let filename = "document.txt";
print(filename.startsWith(sub: "doc")); // true
```

### `endsWith`

Checks if the string ends with the specified substring.

```strata
fn endsWith(sub: String): Bool
```

```strata
let imageName = "picture.png";
print(imageName.endsWith(sub: ".png")); // true
```

## Transformation

### `lower`

Converts the string to lowercase.

```strata
fn lower(): String
```

```strata
let shout = "HELLO";
print(shout.lower()); // "hello"
```

### `upper`

Converts the string to uppercase.

```strata
fn upper(): String
```

```strata
let greeting = "hello";
print(greeting.upper()); // "HELLO"
```

### `trim`

Removes whitespace from both the beginning and end of the string.

```strata
fn trim(): String
```

```strata
let userInput = "  hello  ";
print(userInput.trim()); // "hello"
```

### `trimLeft` / `ltrim`

Removes whitespace from the beginning of the string.

```strata
fn trimLeft(): String
```

```strata
let s = "  hello";
print(s.trimLeft()); // "hello"
```

### `trimRight` / `rtrim`

Removes whitespace from the end of the string.

```strata
fn trimRight(): String
```

```strata
let s = "hello  ";
print(s.trimRight()); // "hello"
```

### `replace`

Replaces all occurrences of the `old` string with the `new` string.

```strata
fn replace(old: String, new: String): String
```

```strata
let template = "hello world";
print(template.replace(old: "world", new: "universe")); // "hello universe"
```

### `split`

Splits the string into an array of substrings using the delimiter `sep`.

```strata
fn split(sep: String): Array<String>
```

```strata
let csvData = "apple,banana,cherry";
let items = csvData.split(sep: ",");
// items is ["apple", "banana", "cherry"]
```

### `substring`

Extracts a portion of the string. If `len` is omitted, extracts to the end.

```strata
fn substring(start: Int, len: Int?): String
```

```strata
let phrase = "hello world";
print(phrase.substring(start: 0, len: 5)); // "hello"
print(phrase.substring(start: 6));         // "world"
```

### `reverse`

Reverses the characters in the string.

```strata
fn reverse(): String
```

```strata
let word = "abc";
print(word.reverse()); // "cba"
```

### `repeat`

Repeats the string `n` times.

```strata
fn repeat(n: Int): String
```

```strata
let star = "*";
print(star.repeat(n: 5)); // "*****"
```

### `pad`

Pads the string to a certain length with another string.

```strata
fn pad(length: Int, padString: String = " ", type: Int = STR_PAD_RIGHT): String
```

```strata
let s = "Hello";
print(s.pad(length: 10, padString: ".")); // "Hello....."
```
