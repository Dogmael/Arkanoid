/**
 * Clamps a number between a minimum and maximum value.
 * Example: clamp(10, 0, 5) returns 5
 *
 * @param {number} value - The number to clamp.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} - The clamped value.
 */
export function clamp (value, min, max) {
	return Math.min(Math.max(value, min), max);
}
