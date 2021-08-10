/**
 * @jest-environment jsdom
 */

const methods = require('./methods.js');

test('Toggle handler', () => {

	const params = [1, 2, 3];
	
	expect(methods.toggleHandler(...params)).toBe(1);
});

test('Sort handler', () => {

	const result = {"id":3,"name":"Complete coding challenge","priority":1,"complete":1,"publish":true};

	const params = [1, 2];

	expect(JSON.stringify(methods.sortHandler(...params))).toBe(JSON.stringify(result));
});

test('Render Modal', () => {

	const params = [1, 2, 3];

	expect(methods.renderModal(...params)).toBe(true);
});

test('Save New Item', () => {

	const params = [1, 2];

	const arr = [{ id: 7, name: 'Test item', priority: 0, complete: 0, publish: true }];

	expect(JSON.stringify(methods.saveValue(...params))).toBe(JSON.stringify(arr));
});

