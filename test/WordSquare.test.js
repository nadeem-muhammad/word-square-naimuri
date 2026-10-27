import test from 'node:test';
import assert from 'node:assert/strict';
import { WordSquare } from '../src/WordSquare.js';

test('the next row must start with the letters of its column so far', () => {
    // Rows so far: rose, oven. Column 2 (the third letters) starts with "s" then "e".
    const square = new WordSquare(4).withRow('rose').withRow('oven');
    assert.equal(square.column(0), 'ro');
    assert.equal(square.startOfNextRow(), 'se');
});

test('a finished square is valid when every row is the same word as its column', () => {
    const good = new WordSquare(2).withRow('no').withRow('on');
    const bad = new WordSquare(2).withRow('ab').withRow('cd');
    assert.equal(good.isValid(), true);
    assert.equal(bad.isValid(), false);
});
