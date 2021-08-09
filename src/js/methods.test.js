/**
 * @jest-environment jsdom
 */

const methods = require('./methods.js');

test('Toggle handler', () => {

	const params = [1, 2, 3];

	expect(methods.toggleHandler(...params)).toBe(true);
});

test('Sort handler', () => {

	const params = [1, 2];

	expect(methods.sortHandler(...params)).toBe(true);
});

test('Render Modal', () => {

	const params = [1, 2, 3];

	expect(methods.renderModal(...params)).toBe(true);
});

