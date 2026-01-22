# Array Methods

Methods available on `Array<T>` types. Strata arrays are generic, meaning `Array<Int>` contains only integers. Using raw `Array` is equivalent to `Array<Mixed>`.

## Modification

### `push`

Adds an item to the end of the array and returns the new size.

```strata
fn push(item: T): Int
```

```strata
let numbers = [1, 2];
numbers.push(item: 3);
// numbers is [1, 2, 3]
```

### `pop`

Removes and returns the last item from the array. Returns `Null` if empty.

```strata
fn pop(): T|Null
```

```strata
let stack = [1, 2];
let lastItem = stack.pop(); // 2
// stack is [1]
```

### `unshift`

Adds an item to the beginning of the array and returns the new size.

```strata
fn unshift(item: T): Int
```

```strata
let queue = [2, 3];
queue.unshift(item: 1);
// queue is [1, 2, 3]
```

### `shift`

Removes and returns the first item from the array. Returns `Null` if empty.

```strata
fn shift(): T|Null
```

```strata
let queue = [1, 2];
let firstItem = queue.shift(); // 1
// queue is [2]
```

## Transformation

### `map`

Creates a new array by applying a function to every element. The callback must have explicit parameter types.
*Note: The return type of the callback determines the type of the new array.*

```strata
fn map<U>(callback: (T) -> U): Array<U>
```

```strata
let numbers = [1, 2, 3];
let doubledNumbers = numbers.map((num: Int) => num * 2);
// doubledNumbers is [2, 4, 6]
```

### `filter`

Creates a new array with all elements that pass the test implemented by the provided function.

```strata
fn filter(callback: (T) -> Bool): Array<T>
```

```strata
let numbers = [1, 2, 3, 4];
let evenNumbers = numbers.filter((num: Int) => num % 2 == 0);
// evenNumbers is [2, 4]
```

### `reverse`

Returns a new array with the elements in reverse order.

```strata
fn reverse(): Array<T>
```

```strata
let sequence = [1, 2, 3];
let reversedSequence = sequence.reverse(); // [3, 2, 1]
```

### `merge`

Merges this array with another array, returning a new array.

```strata
fn merge(other: Array<T>): Array<T>
```

```strata
let firstBatch = [1, 2];
let secondBatch = [3, 4];
let combined = firstBatch.merge(secondBatch); // [1, 2, 3, 4]
```

## Inspection

### `count`

Returns the number of elements in the array.

```strata
fn count(): Int
```

```strata
let items = [1, 2, 3];
print(items.count()); // 3
```

### `contains`

Checks if the array contains the specified item.

```strata
fn contains(item: T): Bool
```

```strata
let fruits = ["apple", "banana"];
if fruits.contains("apple") {
    print("Has apple");
}
```

### `join`

Joins all elements of the array into a string, separated by `glue`.

```strata
fn join(glue: String): String
```

```strata
let words = ["hello", "world"];
print(words.join(glue: " ")); // "hello world"
```
