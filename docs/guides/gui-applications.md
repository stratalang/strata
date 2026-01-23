# GUI Applications

Strata lets you build desktop applications with GTK4. The built-in bindings are currently minimal, but you can still access the full GTK4 API through FFI while keeping Strata's type safety for the parts it defines.

## Getting Started

To build a GUI application, you'll typically need a project structure that includes your Strata source files and any necessary assets (like `.str.ui` or `.css` files).

### Requirements

Install GTK4 before building or running GUI applications:

#### Ubuntu/Debian:
<span></span>

```bash:no-line-numbers
sudo apt install libgtk-4-dev
```

#### macOS:
<span></span>

```bash:no-line-numbers
brew install gtk4
```

### Project Configuration

Enable the GTK extension `strata_gtk` and configuration in your `.strata.json`:

```json
{
  "srcDir": "src",
  "buildDir": "build",
  "entryPoint": "src/app.str",
  "runtime": {
    "extensions": [
      "/path/to/strata_gtk.so"
    ],
    "ini": {
      "ffi.enable": "1"
    }
  }
}
```

## Basic Application

A minimal GTK4 application in Strata involves initializing the `App` class and setting up a window in the `onStartup` handler.

```strata
import Strata.Gtk.App;

fn main(): Void {
    let app = App(options: [
        'prgname' => 'strata-gtk-app',
        'appname' => 'Hello Strata',
        'builder_only' => false,
    ]);

    app.onStartup(handler: (a: App) => {
        let window = a.window();
        window.title(title: 'Hello World');
        window.defaultSize(width: 480, height: 240);

        // add a simple label
        let label = a.label(text: 'Hello from Strata + GTK4!');
        window.child(child: label);

        window.show();
    });

    app.run();
}
```

## Project Structure

For a GUI project, you might have a structure like this:

```text
.
├── .strata.json
└── src/
    ├── app.str
    └── assets/
        ├── styles.css
        └── MainWindow.str.ui
```

## Running the Application

You can run your GUI application using the standard `run` command:

```bash
strata run src/app.str
```

Strata will automatically:
1. Compile your code.
2. Ensure the `ffi` extension is loaded.
3. Discover and use your project's autoloader.
4. Copy any associated assets to the execution environment.

## Additional Resources

For more detailed information on GTK4, refer to the [GTK4 documentation](https://docs.gtk.org/gtk4/).
