import { clamp } from './helpers.js';

describe('helpers', () => {
	describe('clamp()', () => {
		const testCases = [
			{
				description: 'should clamp value to minimum when below range',
				x: 4,
				min: 5,
				max: 10,
				expected: 5
			},
			{
				description: 'should keep value when within range',
				x: 0,
				min: -1,
				max: 10,
				expected: 0
			},
			{
				description: 'should clamp value to minimum with decimal numbers',
				x: -4.5,
				min: -0.21,
				max: 10,
				expected: -0.21
			},
			{
				description: 'should clamp value to maximum when above range',
				x: 1000.02,
				min: 5,
				max: 55,
				expected: 55
			}
		];

		test.each(testCases)(
			'$description',
			({ x, min, max, expected }) => {
				const result = clamp(x, min, max);
				expect(result).toBe(expected);
			}
		);
	});
});
