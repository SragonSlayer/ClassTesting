const Calculator = require('./calculator');

describe('Calculator', () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    test('basic addition', () => {
        expect(calc.evaluate('2 + 3')).toBe(5);
    });

    test('basic subtraction', () => {
        expect(calc.evaluate('10 - 4')).toBe(6);
    });

    test('basic multiplication', () => {
        expect(calc.evaluate('3 * 4')).toBe(12);
    });

    test('basic division', () => {
        expect(calc.evaluate('15 / 3')).toBe(5);
    });

    test('complex expression', () => {
        expect(calc.evaluate('2 + 3 * 4')).toBe(14);
    });

    test('parentheses', () => {
        expect(calc.evaluate('(2 + 3) * 4')).toBe(20);
    });

    test('math functions', () => {
        expect(calc.evaluate('sin(0)')).toBe(0);
        expect(calc.evaluate('cos(0)')).toBe(1);
        expect(calc.evaluate('sqrt(4)')).toBe(2);
    });

    test('constants', () => {
        expect(calc.evaluate('pi')).toBe(Math.PI);
        expect(calc.evaluate('e')).toBe(Math.E);
    });

    test('memory store and recall', () => {
        calc.storeMemory('test', 42);
        expect(calc.recallMemory('test')).toBe(42);
    });

    test('memory in expression', () => {
        calc.storeMemory('x', 5);
        expect(calc.evaluate('mem[x] + 3')).toBe(8);
    });

    test('history', () => {
        calc.evaluate('1 + 1');
        calc.evaluate('2 * 3');
        const hist = calc.getHistory();
        expect(hist.length).toBe(2);
        expect(hist[0].result).toBe(2);
        expect(hist[1].result).toBe(6);
    });

    test('error handling', () => {
        const result = calc.evaluate('invalid expression');
        expect(result).toMatch(/^Error:/);
    });

    test('stats', () => {
        calc.evaluate('1 + 1');
        calc.evaluate('invalid');
        const stats = calc.getStats();
        expect(stats.totalCalculations).toBe(2);
        expect(stats.successful).toBe(1);
        expect(stats.errors).toBe(1);
    });

    test('clear memory', () => {
        calc.storeMemory('test', 42);
        calc.clearMemory();
        expect(calc.recallMemory('test')).toBe('Memory[test] not found');
    });

    test('clear history', () => {
        calc.evaluate('1 + 1');
        calc.clearHistory();
        expect(calc.getHistory().length).toBe(0);
    });

    test('advanced math', () => {
        expect(calc.evaluate('pow(2, 3)')).toBe(8);
        expect(calc.evaluate('log(100)')).toBe(2); // natural log
        expect(calc.evaluate('exp(1)')).toBe(Math.E);
    });

    test('trigonometric functions', () => {
        expect(calc.evaluate('tan(pi/4)')).toBeCloseTo(1);
        expect(calc.evaluate('asin(1)')).toBe(Math.PI / 2);
    });

    test('rounding functions', () => {
        expect(calc.evaluate('ceil(3.2)')).toBe(4);
        expect(calc.evaluate('floor(3.8)')).toBe(3);
        expect(calc.evaluate('round(3.5)')).toBe(4);
    });

    test('min max', () => {
        expect(calc.evaluate('min(5, 3, 8)')).toBe(3);
        expect(calc.evaluate('max(5, 3, 8)')).toBe(8);
    });

    test('absolute value', () => {
        expect(calc.evaluate('abs(-5)')).toBe(5);
    });

    test('log10', () => {
        expect(calc.evaluate('log10(100)')).toBe(2);
    });

    test('phi constant', () => {
        const phi = (1 + Math.sqrt(5)) / 2;
        expect(calc.evaluate('phi')).toBe(phi);
    });

    test('complex expression with constants', () => {
        expect(calc.evaluate('2 * pi * 5')).toBe(2 * Math.PI * 5);
    });

    test('division by zero', () => {
        const result = calc.evaluate('1 / 0');
        expect(result).toBe(Infinity);
    });

    test('invalid function', () => {
        const result = calc.evaluate('nonexistent(5)');
        expect(result).toMatch(/^Error:/);
    });

    test('memory with undefined key', () => {
        expect(calc.evaluate('mem[nonexistent]')).toBe('undefined');
    });

    test('large numbers', () => {
        expect(calc.evaluate('1000000 * 1000000')).toBe(1000000000000);
    });

    test('decimal operations', () => {
        expect(calc.evaluate('0.1 + 0.2')).toBeCloseTo(0.3);
    });

    test('negative numbers', () => {
        expect(calc.evaluate('-5 + 10')).toBe(5);
    });

    test('power operations', () => {
        expect(calc.evaluate('2 ** 3')).toBe(8);
    });

    test('modulo', () => {
        expect(calc.evaluate('10 % 3')).toBe(1);
    });

    test('random function', () => {
        const result = calc.evaluate('random()');
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(1);
    });

    test('nested functions', () => {
        expect(calc.evaluate('sqrt(pow(3, 2) + pow(4, 2))')).toBe(5);
    });

    test('expression with spaces', () => {
        expect(calc.evaluate('  2   +   3  ')).toBe(5);
    });

    test('multiple operations', () => {
        expect(calc.evaluate('2 + 3 - 1 * 4 / 2')).toBe(3);
    });

    test('history limit', () => {
        for (let i = 0; i < 15; i++) {
            calc.evaluate(`${i} + 1`);
        }
        const hist = calc.getHistory();
        expect(hist.length).toBe(10);
        expect(hist[0].result).toBe(6); // Should start from the 6th calculation
    });
});