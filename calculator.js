const readline = require('readline');

class Calculator {
    constructor() {
        this.memory = {};
        this.history = [];
        this.constants = {
            pi: Math.PI,
            e: Math.E,
            phi: (1 + Math.sqrt(5)) / 2
        };
    }

    evaluate(expression) {
        try {
            // Replace constants
            expression = expression.replace(/\b(pi|e|phi)\b/g, (match) => this.constants[match]);

            // Replace memory references
            expression = expression.replace(/mem\[(\w+)\]/g, (match, key) => {
                return this.memory[key] !== undefined ? this.memory[key] : 'undefined';
            });

            // Safe evaluation with limited Math functions
            const result = this.safeEval(expression);
            this.history.push({ expression, result });
            return result;
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }

    safeEval(expression) {
        // Whitelist of allowed functions and constants
        const allowed = {
            Math: Math,
            sin: Math.sin,
            cos: Math.cos,
            tan: Math.tan,
            asin: Math.asin,
            acos: Math.acos,
            atan: Math.atan,
            log: Math.log,
            log10: Math.log10,
            ln: Math.log,
            exp: Math.exp,
            sqrt: Math.sqrt,
            pow: Math.pow,
            abs: Math.abs,
            ceil: Math.ceil,
            floor: Math.floor,
            round: Math.round,
            min: Math.min,
            max: Math.max,
            random: Math.random,
            PI: Math.PI,
            E: Math.E,
            Infinity: Infinity,
            NaN: NaN
        };

        // Create a function with limited scope
        const func = new Function(...Object.keys(allowed), `return (${expression});`);
        return func(...Object.values(allowed));
    }

    storeMemory(key, value) {
        this.memory[key] = value;
        return `Stored ${value} in memory[${key}]`;
    }

    recallMemory(key) {
        return this.memory[key] !== undefined ? this.memory[key] : `Memory[${key}] not found`;
    }

    clearMemory() {
        this.memory = {};
        return 'Memory cleared';
    }

    getHistory() {
        return this.history.slice(-10); // Last 10 calculations
    }

    clearHistory() {
        this.history = [];
        return 'History cleared';
    }

    getStats() {
        const totalCalculations = this.history.length;
        const errors = this.history.filter(item => typeof item.result === 'string' && item.result.startsWith('Error')).length;
        const successful = totalCalculations - errors;
        return { totalCalculations, successful, errors };
    }
}

function startCalculator() {
    const calc = new Calculator();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('Advanced JavaScript Calculator');
    console.log('Commands:');
    console.log('  store <key> <value> - Store value in memory');
    console.log('  recall <key> - Recall value from memory');
    console.log('  clearmem - Clear all memory');
    console.log('  history - Show last 10 calculations');
    console.log('  clearhist - Clear history');
    console.log('  stats - Show calculation statistics');
    console.log('  help - Show this help');
    console.log('  exit - Exit calculator');
    console.log('Constants: pi, e, phi');
    console.log('Functions: sin, cos, tan, asin, acos, atan, log, log10, ln, exp, sqrt, pow, abs, ceil, floor, round, min, max, random');
    console.log('Memory: mem[key]');
    console.log('Enter expressions or commands:');

    rl.on('line', (input) => {
        const trimmed = input.trim();
        if (trimmed === 'exit') {
            console.log('Goodbye!');
            rl.close();
            return;
        }

        if (trimmed === 'help') {
            console.log('Commands:');
            console.log('  store <key> <value> - Store value in memory');
            console.log('  recall <key> - Recall value from memory');
            console.log('  clearmem - Clear all memory');
            console.log('  history - Show last 10 calculations');
            console.log('  clearhist - Clear history');
            console.log('  stats - Show calculation statistics');
            console.log('  help - Show this help');
            console.log('  exit - Exit calculator');
            console.log('Constants: pi, e, phi');
            console.log('Functions: sin, cos, tan, asin, acos, atan, log, log10, ln, exp, sqrt, pow, abs, ceil, floor, round, min, max, random');
            console.log('Memory: mem[key]');
            return;
        }

        if (trimmed.startsWith('store ')) {
            const parts = trimmed.split(' ');
            if (parts.length >= 3) {
                const key = parts[1];
                const value = parseFloat(parts[2]);
                if (!isNaN(value)) {
                    console.log(calc.storeMemory(key, value));
                } else {
                    console.log('Invalid value for storage');
                }
            } else {
                console.log('Usage: store <key> <value>');
            }
            return;
        }

        if (trimmed.startsWith('recall ')) {
            const key = trimmed.split(' ')[1];
            console.log(calc.recallMemory(key));
            return;
        }

        if (trimmed === 'clearmem') {
            console.log(calc.clearMemory());
            return;
        }

        if (trimmed === 'history') {
            const hist = calc.getHistory();
            if (hist.length === 0) {
                console.log('No history available');
            } else {
                hist.forEach((item, index) => {
                    console.log(`${index + 1}: ${item.expression} = ${item.result}`);
                });
            }
            return;
        }

        if (trimmed === 'clearhist') {
            console.log(calc.clearHistory());
            return;
        }

        if (trimmed === 'stats') {
            const stats = calc.getStats();
            console.log(`Total calculations: ${stats.totalCalculations}`);
            console.log(`Successful: ${stats.successful}`);
            console.log(`Errors: ${stats.errors}`);
            return;
        }

        // Evaluate expression
        const result = calc.evaluate(trimmed);
        console.log(result);
    });

    rl.on('close', () => {
        process.exit(0);
    });
}

// Export for testing
module.exports = Calculator;

// Run if called directly
if (require.main === module) {
    startCalculator();
}