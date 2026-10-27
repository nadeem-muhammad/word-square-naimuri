import test from 'node:test';
import assert from 'node:assert/strict';
import { WordList } from '../src/WordList.js';

test('keeps only the words with the length we asked for', () => {
    const list = WordList.fromText('at\nate\nrose\noven', 4);
    assert.equal(list.has('rose'), true);
    assert.equal(list.has('ate'), false);
});

test('finds the words that start with some letters', () => {
    const list = WordList.fromText('rose\nroad\noven', 4);
    assert.deepEqual(list.wordsStartingWith('ro'), ['rose', 'road']);
    assert.deepEqual(list.wordsStartingWith('x'), []);
});
