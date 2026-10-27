import test from 'node:test';
import assert from 'node:assert/strict';
import { WordList } from '../src/WordList.js';
import { WordSquareSolver } from '../src/WordSquareSolver.js';

const solverFor = (words, size) => new WordSquareSolver(WordList.fromText(words.join('\n'), size));

test('solves the examples', () => {
    const solver = solverFor(['rose', 'oven', 'send', 'ends', 'moan', 'once'], 4);
    assert.equal(solver.solve(4, 'eeeeddoonnnsssrv').toString(), 'rose\noven\nsend\nends');
});

test('only uses the letters it was given', () => {
    const solver = solverFor(['aa', 'ab', 'ba'], 2);
    assert.equal(solver.solve(2, 'aaab').toString(), 'aa\nab');
    assert.equal(solver.solve(2, 'abbb'), null);
});

test('returns null when the letters cannot make a word square', () => {
    const solver = solverFor(['rose', 'oven', 'send', 'ends'], 4);
    assert.equal(solver.solve(4, 'zzzzzzzzzzzzzzzz'), null);
});
