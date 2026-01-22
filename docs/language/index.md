# Language Reference

This section provides a comprehensive reference for the Strata programming language.

## Overview

Strata is a statically typed programming language. This reference covers all language features.

## Table of Contents

- [Language Basics](#language-basics)
- [Object Oriented Design](#object-oriented-design)
- [Project Structure](#project-structure)
- [Standard Library](#standard-library)
- [Advanced](#advanced)

## Language Basics

- [Variables](/language/basics/variables) - Variable declarations and scoping
- [Types](/language/basics/types) - Type system, primitives, nullable, unions
- [Functions](/language/basics/functions) - Function definitions, parameters, return types
- [Control Flow](/language/basics/control-flow) - if/else, loops, match expressions

## Object Oriented Design

- [Classes](/language/oop/classes) - Classes, inheritance, properties, methods
- [Interfaces & Traits](/language/oop/interfaces) - Interfaces and traits
- [Generics](/language/oop/generics) - Generic type parameters

## Project Structure

- [File Structure](/language/structure/files) - Top-level code rules
- [Imports](/language/structure/imports) - Importing modules and symbols

## Standard Library

- [Overview](/language/std/) - Library structure
- [Numbers](/language/std/numbers) - Integer and Float methods
- [Strings](/language/std/string) - String manipulation
- [Arrays](/language/std/array) - Array operations
- [Associative Arrays](/language/std/associative-arrays) - Maps and Dictionaries
- [Input & Output](/language/std/io) - Console and File I/O

## Advanced

- [Error Handling](/language/error-handling) - Result types, try-catch
- [PHP Interoperability](/language/advanced/php-interop) - Using PHP features
- [Code Guidelines](/language/code-guidelines) - Coding standards

## Core Principles

Strata follows these core principles:

1. **Safety by default**: All errors must be handled
2. **Explicitness over magic**: No implicit behavior
3. **Strong static typing**: Types are checked at compile time
4. **Tooling-first**: Built for great IDE support

## Quick Reference

### Basic Syntax

```strata
// variables
let name: String = "Luna";
let age = 6;  // type inferred

// types
type UserId = Int;

// functions
fn greet(name: String): String {
    return "Hello, ${name}!";
}

// logic belongs in functions (e.g. main)
fn main(): Void {
    try {
        let result = loadUser(id: 1);
        print(result.unwrap().name);
    } catch (e) {
        print("Error: " . e.getMessage());
    }
}
```

---

**Explore the language features** by clicking on the topics [above](#table-of-contents).
