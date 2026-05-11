# ClassTesting
Testing behaviors for class

## Advanced JavaScript Calculator

This repository contains a comprehensive JavaScript calculator implementation with both command-line and web interfaces.

### Features

- **Basic Arithmetic**: Addition, subtraction, multiplication, division, modulo
- **Advanced Functions**: Trigonometric functions (sin, cos, tan, asin, acos, atan), logarithms (log, ln, log10), exponential (exp), square root (sqrt), power (pow)
- **Constants**: π (pi), e, φ (phi - golden ratio)
- **Memory Functions**: Store, recall, and clear memory values
- **Calculation History**: Track and display previous calculations
- **Statistics**: View total calculations, successful operations, and errors
- **Error Handling**: Safe evaluation with proper error messages
- **Multiple Interfaces**: Command-line interface and web-based GUI

### Files

- `calculator.js`: Main calculator class and command-line interface
- `calculator.test.js`: Comprehensive test suite using Jest
- `index.html`: Web-based calculator with interactive UI
- `ab.js`: Simple variable declarations (original)
- `xy.js`: Simple variable declarations (original)

### Usage

#### Command-Line Interface

Run the calculator from the command line:

```bash
node calculator.js
```

Available commands:
- Mathematical expressions: `2 + 3 * 4`, `sin(pi/2)`, `sqrt(16)`
- Memory: `store x 42`, `recall x`, `clearmem`
- History: `history`, `clearhist`
- Statistics: `stats`
- Help: `help`
- Exit: `exit`

#### Web Interface

Open `index.html` in a web browser for a graphical calculator interface.

#### Testing

Run the test suite:

```bash
npm test calculator.test.js
```

Or with Jest:

```bash
jest calculator.test.js
```

### Examples

```javascript
// Basic operations
2 + 3 = 5
10 - 4 = 6
3 * 4 = 12
15 / 3 = 5

// Advanced functions
sin(0) = 0
cos(0) = 1
sqrt(4) = 2
pow(2, 3) = 8
log(100) = 4.605170185988092 (natural log)
log10(100) = 2

// Constants
pi ≈ 3.141592653589793
e ≈ 2.718281828459045
phi ≈ 1.618033988749895

// Memory usage
store radius 5
recall radius = 5
2 * pi * mem[radius] = 31.41592653589793

// Complex expressions
sqrt(pow(3, 2) + pow(4, 2)) = 5
sin(pi/4) + cos(pi/4) ≈ 1.414213562373095
```

### Architecture

The calculator uses a safe evaluation approach with a whitelist of allowed Math functions to prevent code injection. It maintains calculation history and provides both programmatic and interactive interfaces.

### Testing Coverage

The test suite covers:
- Basic arithmetic operations
- Mathematical functions
- Constants
- Memory operations
- History management
- Error handling
- Statistics
- Edge cases (division by zero, invalid expressions, etc.)

### Browser Compatibility

The web interface works in all modern browsers that support ES6 features.

### Contributing

This is a testing repository for class purposes. Feel free to experiment with the calculator implementation.
