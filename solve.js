import { existsSync, readFileSync } from 'node:fs';
import { parsePuzzle } from './src/parsePuzzle.js';
import { WordList } from './src/WordList.js';
import { WordSquareSolver } from './src/WordSquareSolver.js';

const WORD_LIST_FILE = 'enable1.txt';

const args = process.argv.slice(2);
const lines = args[0] === '--file' ? readFileSync(args[1], 'utf8').split('\n') : args;
const puzzleLines = lines.filter((line) => line.trim() !== '');

if (puzzleLines.length === 0) {
    console.log('Usage: node solve.js "<size> <letters>"\n   or: node solve.js --file puzzles.txt');
    process.exit(1);
}
if (!existsSync(WORD_LIST_FILE)) {
    console.error(`Cannot find ${WORD_LIST_FILE}. Run "npm run dictionary" to download it.`);
    process.exit(1);
}

const wordListText = readFileSync(WORD_LIST_FILE, 'utf8');

for (const line of puzzleLines) {
    console.log(`Input: ${line.trim()}`);
    try {
        const { size, letters } = parsePuzzle(line);
        const solver = new WordSquareSolver(WordList.fromText(wordListText, size));
        const square = solver.solve(size, letters);
        console.log(square === null ? 'No word square found' : square.toString());
    } catch (error) {
        console.log(`Invalid puzzle: ${error.message}`);
    }
    console.log(); // blank line between puzzles
}