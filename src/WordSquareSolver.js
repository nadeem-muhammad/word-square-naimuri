import { WordSquare } from './WordSquare.js';

// Finds a word square by adding one row at a time, and going back when a row leads nowhere.
export class WordSquareSolver {
    constructor(wordList) {
        this.wordList = wordList;
    }

    solve(size, letters) {
        return this.addRow(new WordSquare(size), letters);
    }

    // "letters" are the letters not used yet.
    addRow(square, letters) {
        if (square.rows.length === square.size) {
            return square;
        }
        // Try every word that starts the way this row is forced to start.
        for (const word of this.wordList.wordsStartingWith(square.startOfNextRow())) {
            const lettersLeft = useLetters(word, letters);
            if (lettersLeft === null) {
                continue; // we do not have the letters for this word
            }
            const newSquare = square.withRow(word);
            if (this.laterRowsCanStart(newSquare)) {
                const solution = this.addRow(newSquare, lettersLeft);
                if (solution !== null) {
                    return solution;
                }
            }
        }
        return null; // nothing worked, so the caller tries its next word
    }

    // Rows still to come are already forced to start with their column. Is there a word for each one?
    laterRowsCanStart(square) {
        for (let index = square.rows.length; index < square.size; index++) {
            if (this.wordList.wordsStartingWith(square.column(index)).length === 0) {
                return false;
            }
        }
        return true;
    }
}

// Takes a word's letters out of the letters we have.
// Returns the letters left over, or null if we do not have the letters for the word.
function useLetters(word, letters) {
    let lettersLeft = letters;
    for (const letter of word) {
        const position = lettersLeft.indexOf(letter);
        if (position === -1) {
            return null;
        }
        lettersLeft = lettersLeft.slice(0, position) + lettersLeft.slice(position + 1);
    }
    return lettersLeft;
}
