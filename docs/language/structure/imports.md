# Imports

Strata requires explicit imports for all symbols. There are no implicit imports or globals.

## Import Syntax

### Basic Import

```strata
import App.Models.User;
import App.Services.Logger;
```

### Aliased Import

```strata
import App.Models.User as UserModel;
import Illuminate.Http.Request as HttpRequest;
```

### Function Import

```strata
import fn MyModule.myHelper;
import fn OtherModule.utility as helper;
```

- Imports are file-level only
- Paths map to directory structure
- No wildcards
- Use `as` for aliasing to avoid name collisions
- Use `fn` prefix specifically for function imports

### Import Rules

1. **All symbols must be imported**: No magic imports
2. **File-level only**: Imports at the top of the file
3. **No wildcards**: Must import specific symbols
4. **Paths map to directories**: `App.Models.User` maps to `App/Models/User.str`
5. **Aliasing**: Use `as` to provide a local name for an imported symbol
6. **Function explicitly**: Use `fn` for importing standalone functions

## Import Examples

### Single Import

```strata
import App.Models.User;

fn createUser(): User {
    return User(name: "Donald", email: "donaldpakkies@gmail.com");
}
```

### Multiple Imports

```strata
import App.Models.User;
import App.Models.Post;
import App.Services.UserService;

fn example(): Void {
    let user = User(name: "Donald", email: "donaldpakkies@gmail.com");
    let post = Post(title: "Hello", content: "World");
    let service = UserService();
}
```

## Directory Structure

Imports map to your directory structure:

```
src/
  App/
    Models/
      User.str
    Services/
      Logger.str
```

```strata
import App.Models.User;
import App.Services.Logger;
```

## Import Path Resolution

Strata resolves imports based on:

1. **Current file location**: Relative to the file
2. **Project root**: Absolute from project root
3. **Composer autoload**: If using Composer

## Common Patterns

### Models

```strata
import App.Models.User;
import App.Models.Post;
import App.Models.Comment;
```

### Services

```strata
import App.Services.UserService;
import App.Services.EmailService;
import App.Services.NotificationService;
```

### Utilities

```strata
import App.Utils.StringHelper;
import App.Utils.DateHelper;
import App.Utils.Validator;
```

## Best Practices

1. **Group imports**: Group by category (Models, Services, Utils)
2. **Use clear paths**: Make import paths match directory structure
3. **Import only what you need**: Don't import unused symbols
4. **Organize files**: Keep related files in the same directory

## Examples

### Example: Web Application

```strata
// src/App/Http/Controllers/UserController.str
import App.Models.User;
import App.Services.UserService;
import App.Http.Request;
import App.Http.Response;

class UserController {
    public fn index(): Response {
        let service = UserService();
        let users = service.getAll();
        return Response(data: users);
    }
}
```

### Example: Library

```strata
// src/MyLib/Utils/Math.str
import MyLib.Utils.NumberHelper;

fn calculateAverage(numbers: Array<Float>): Float {
    let helper = NumberHelper();
    return helper.sum(numbers: numbers) / count(numbers) as Float;
}
```

## Import Errors

Common import errors:

1. **Symbol not found**: Import path doesn't match file location
2. **Circular dependency**: Two files import each other
3. **Missing import**: Using a symbol without importing it

## Next Steps

- [PHP Interoperability](/language/advanced/php-interop.md) - Using PHP code in Strata
- [Getting Started](/getting-started/) - Setting up your project structure
