import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePuzzle } from '../src/parsePuzzle.js';

test('reads the size and the letters', () => {
    assert.deepEqual(parsePuzzle('4 eeeeddoonnnsssrv'), { size: 4, letters: 'eeeeddoonnnsssrv' });
});

test('rejects a puzzle with the wrong number of letters', () => {
    assert.throws(() => parsePuzzle('2 abc'));
});
