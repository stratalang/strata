# JSON

Strata provides native support for JSON encoding and decoding through standard library wrappers.

## Encoding

To convert a value to a JSON string, use `json_encode`.

```strata
fn json_encode(value: Mixed, flags: Int = 0, depth: Int = 512): String|False
```

```strata
let data = [
    "name" => "Strata",
    "version" => 1.0,
    "features" => ["strict", "generic"]
];

let json = json_encode(value: data);
print(json);
// {"name":"Strata","version":1,"features":["strict","generic"]}
```

### Pretty Printing

Use the `JSON_PRETTY_PRINT` flag for formatted output.

```strata
let json = json_encode(value: data, flags: JSON_PRETTY_PRINT);
```

## Decoding

To parse a JSON string, use `json_decode`.

```strata
fn json_decode(
    json: String,
    associative: Bool? = Null,
    depth: Int = 512,
    flags: Int = 0
): Mixed
```

### Decoding to Arrays (Associative)

Pass `associative: true` to decode objects as associative arrays.

```strata
let json = '{"name": "Strata", "version": 1}';
let data = json_decode(json: json, associative: true);

print(data["name"]); // "Strata"
```

### Decoding to Objects

By default (or with `associative: false`), JSON objects are decoded as `stdClass` objects.

```strata
let data = json_decode(json: json);
print(data.name); // "Strata"
```

## Error Handling

If encoding or decoding fails, these functions may return `false` or `Null`. For robust error handling, consider wrapping them or checking the `json_last_error()` function, although Strata encourages checking the return result.

```strata
let json = json_encode(value: infinite_recursion);

if json == false {
    // handle error
}
```
