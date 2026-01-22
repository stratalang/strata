# Testing

Strata compiles to PHP, which means you can leverage the robust PHP testing ecosystem, particularly **PHPUnit**, to test your Strata applications.

## Setting Up PHPUnit

1.  **Install PHPUnit**:
    ```bash:no-line-numbers
    composer require --dev phpunit/phpunit
    ```

2.  **Configure PHPUnit**:
    Create a `phpunit.xml` in your project root:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <phpunit bootstrap="vendor/autoload.php" colors="true">
        <testsuites>
            <testsuite name="Application Test Suite">
                <directory>tests</directory>
            </testsuite>
        </testsuites>
    </phpunit>
    ```

## Writing Tests

## Writing Tests

Strata classes and functions compile to standard PHP, so you can write your tests in PHP or Strata. Using PHP for tests is currently recommended for optimal compatibility with existing PHPUnit tooling and IDE integrations.

### Testing a Strata Class

**Strata Code** (`src/Math.str`):
```strata
namespace App;

class Math {
    public static fn add(a: Int, b: Int): Int {
        return a + b;
    }
}
```

**Test Code** (`tests/MathTest.php`):
```php
<?php

use PHPUnit\Framework\TestCase;
use App\Math;

final class MathTest extends TestCase
{
    public function testAdd(): void
    {
        $this->assertSame(4, Math::add(2, 2));
    }
}
```

## Running Tests

Run PHPUnit from your terminal:

```bash:no-line-numbers
./vendor/bin/phpunit
```

## Testing Philosophy

-   **Unit Tests**: Test individual classes and functions logic.
-   **Integration Tests**: Test how modules work together.
-   **Strata Verify**: You can use `strata check` to statically verify your code before running tests.

## Mocking

You can use standard PHP mocking libraries (like PHPUnit's built-in mocks or Mockery) to mock Strata interfaces and classes, as they result in standard PHP interfaces/classes.
