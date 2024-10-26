import { clamp } from './helpers.js';

const values = [
	{ x: 4, a: 5, b: 10, expectedResult: 5 },
	{ x: 0, a: -1, b: 10, expectedResult: 0 },
	{ x: -4.5, a: -0.21, b: 10, expectedResult: -0.21 },
	{ x: 1000.02, a: 5, b: 55, expectedResult: 55 }
];

test.each(values)(
	'Test clamp function',
	({ x, a, b, expectedResult }) => {
		const result = clamp(x, a, b);

		expect(result).toBe(expectedResult);
	}
);
