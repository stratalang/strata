# Web Application Example

This example shows how to build a simple web application with Strata.

## Basic Web Server

A simple HTTP server:

```strata
fn handleRequest(): String {
    let method = _SERVER['REQUEST_METHOD'];
    let path = _SERVER['REQUEST_URI'];

    if method == "GET" && path == "/" {
        return "Hello, World!";
    }

    if method == "GET" && path == "/about" {
        return "About Page";
    }

    return "404 Not Found";
}

fn main(): Void {
    print(handleRequest());
}
```

## User Model

A simple user model:

```strata
class User(name: String, email: String, id: Int = 0) {
    public fn toJson(): String {
        return '{"id":${this.id},"name":"${this.name}","email":"${this.email}"}';
    }
}
```

## User Service

A service to manage users:

```strata
class UserService {
    users: Array<User> = [];

    public fn createUser(name: String, email: String): User {
        let id = count(this.users) + 1;
        let user = User(name: name, email: email, id: id);
        this.users = this.users + [user];
        return user;
    }

    public fn getUser(id: Int): Option<User> {
        for user in this.users {
            if user.id == id {
                return Some(user);
            }
        }
        return None;
    }

    public fn getAllUsers(): Array<User> {
        return this.users;
    }
}
```

## Request Handler

Handling HTTP requests:

```strata
fn handleGetRequest(path: String, service: UserService): String {
    if path == "/users" {
        let users = service.getAllUsers();
        let json = "[";

        for i, user in users {
            if i > 0 {
                json = json + ",";
            }
            json = json + user.toJson();
        }

        json = json + "]";
        return json;
    }

    if strpos(path, "/users/") === 0 {
        let idStr = path.substring(start: 7);  // remove "/users/"
        let id = idStr as Int;
        let user = service.getUser(id: id);

        if user is Some {
            return user.value.toJson();
        }

        return '{"error":"User not found"}';
    }

    return "404 Not Found";
}

fn handlePostRequest(path: String, service: UserService): String {
    if path == "/users" {
        let name = _POST['name'];
        let email = _POST['email'];

        if name != Null && email != Null {
            let user = service.createUser(name: name, email: email);
            return user.toJson();
        }

        return '{"error":"Name and email required"}';
    }

    return "404 Not Found";
}

fn handleRequest(service: UserService): String {
    let method = _SERVER['REQUEST_METHOD'];
    let path = _SERVER['REQUEST_URI'];

    if method == "GET" {
        return handleGetRequest(path: path, service: service);
    }

    if method == "POST" {
        return handlePostRequest(path: path, service: service);
    }

    return "405 Method Not Allowed";
}
```

## Complete Example

Putting it all together using the components above:

```strata
fn main(): Void {
    let service = UserService();
    print(handleRequest(service: service));
}
```

## Using with RoadRunner

For production, use RoadRunner for better performance:

```strata
fn main(): Void {
    let service = UserService();

    // RoadRunner handles the HTTP server
    // your code handles the request/response
}
```

## Next Steps

- [Web Server Guide](/guides/web-server) - Complete guide to web server setup and deployment
- [CLI Commands: strata serve](/cli/serve) - Detailed serve command reference
- [CLI Application](/examples/cli-app) - Build command-line tools
- [Language Reference](/language/) - Learn more Strata features
- [PHP Interoperability](/language/advanced/php-interop.md) - Using PHP libraries
