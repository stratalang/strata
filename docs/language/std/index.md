# Standard Library

Strata comes with a rich standard library that enhances the capabilities of built-in types.

## Core Modules

- [Numbers](./numbers) - Methods for `Int` and `Float` types.
- [Strings](./string) - Methods for text manipulation.
- [Arrays](./array) - Powerful methods for `Array<T>` manipulation (map, filter, reduce, etc).

## Overview

The standard library is automatically available in all Strata programs. You do not need to import these methods; they are available directly on the types.

```strata
let name = " Strata ".trim().lower();
let numbers = [1, 2, 3].map((n) => n * 2);
```
