---
pageClass: home
aside: false
---

<div class="hero-section">
  <div class="hero-content">
  <img src="/branding/strata-logo-wordmark.svg" alt="Strata" class="logo hero-wordmark" style="max-width: 450px; width: 100%; height: auto; display: block; margin: 0 auto 2rem;" />

  <p style="font-size: 2rem; font-weight: 500; margin-bottom: 1rem; line-height: 1.3;">
    A strongly and statically typed language<br>for building reliable software.
  </p>

  <p style="font-size: 1.2rem; opacity: 0.85; margin-bottom: 2.5rem; line-height: 1.6;">
    Strata's compiler catches bugs at compile time through deep static analysis. Type safety and null safety are guaranteed. No implicit conversions, no runtime surprises.
  </p>

  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <a href="/getting-started/" style="display: inline-block; padding: 0.75rem 2rem; background: #000; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; width: 180px; align-content: center;">Get Started</a>
    <a href="/language/" style="display: inline-block; padding: 0.75rem 2rem; background: transparent; text-decoration: none; border-radius: 6px; font-weight: 600; border: 1px solid currentColor; width: 180px; align-content: center;">Documentation</a>
  </div>
  </div>
</div>

## Why Strata?

### **Correctness**
Strata's type system and null safety eliminate entire classes of bugs before your code ever runs.

```strata
fn getUser(id: Int): Option<User> {
    if id <= 0 {
        return None;
    }

    return Some(User(id: id));
}

fn main(): Void {
    // compiler forces you to handle all cases
    match getUser(id: -1) {
        Some(u) => print("Found: ${u.name}"),
        None    => print("User not found"),
    }
}
```

### **Productivity**
Strata features comprehensive documentation, clear compiler errors, and powerful tooling: an integrated Language Server with auto-completion, type inspections, instant diagnostics, and seamless refactoring.

```strata
fn createUser(name: String, age: Int): User {
    return User(name: name, age: age);
}

fn main(): Void {
    // named arguments with intelligent suggestions
    let user = createUser(name: "Alice", age: 30);

    // Error: Type 'String' is not assignable to type 'Int'
    // let invalid = createUser(name: "Bob", age: "thirty");
}
```

### **Performance**
Strata compiles to standard, optimized PHP code files. It can run standalone using the internal runtime, or deploy to any standard PHP environment. No system dependencies required.

```strata
// compiles to native PHP classes with typed properties
readonly class Point {
    public constructor(
        public x: Float,
        public y: Float
    ) {}
}
```

<div class="build-anything-section">

<div class="build-header" style="border-top: 1px solid var(--vp-c-gutter);">
<h3 class="build-heading">Build Anything</h3>

<p class="build-intro">
From powerful command-line tools to high-performance web applications, Strata delivers the type safety and tooling you need to ship reliable, production-ready software.
</p>
</div>

<div class="build-container">

<div class="build-tabs">
<button class="build-tab active" data-tab="cli">
<strong>CLI Applications</strong>
<span>Build command-line tools with powerful argument parsing and type-safe error handling.</span>
</button>
<button class="build-tab" data-tab="web">
<strong>Web Applications</strong>
<span>Build high-performance servers with RoadRunner or integrate seamlessly with frameworks like Laravel and Symfony.</span>
</button>
</div>

<div class="build-code-window">

<div class="build-code-content active" data-content="cli">

```strata
fn main(): Void {
    match parseArgs() {
        Ok(config) => run(config: config),
        Err(e) => {
            print("Error: ${e}");
            exit(1);
        }
    };
}
```

</div>

<div class="build-code-content" data-content="web">

```strata
import Illuminate.Support.Facades.Route;
import Illuminate.Support.Facades.JsonResponse;

Route::post(uri: "/users", action: (request) => {
    return match createUser(request: request) {
        Ok(user) => JsonResponse(data: user, status: 201),
        Err(e) => JsonResponse(data: e, status: 500),
    }
});
```

</div>

</div>
<div class="build-code-mobile">

<div class="build-code-content active" data-content="cli">

```strata
fn main(): Void {
    match parseArgs() {
        Ok(config) => run(config: config),
        Err(e) => {
            print("Error: ${e}");
            exit(1);
        }
    };
}
```

</div>

<div class="build-code-content" data-content="web">

```strata
import Illuminate.Support.Facades.Route;
import Illuminate.Support.Facades.JsonResponse;

Route::post(uri: "/users", action: (request) => {
    return match createUser(request: request) {
        Ok(user) => JsonResponse(data: user, status: 201),
        Err(e) => JsonResponse(data: e, status: 500),
    }
});
```

</div>

</div>

</div>

</div>


