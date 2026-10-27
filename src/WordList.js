// The valid words of ONE length, with a quick way to find words by their first letters.
export class WordList {
    constructor(words) {
        // For example "ro" -> ["rose", "road"]. The empty text "" -> every word.
        this.wordsByStart = new Map();
        for (const word of words) {
            for (let length = 0; length <= word.length; length++) {
                const start = word.slice(0, length);
                if (!this.wordsByStart.has(start)) {
                    this.wordsByStart.set(start, []);
                }
                this.wordsByStart.get(start).push(word);
            }
        }
    }

    // Reads a word list (one word per line) and keeps the lowercase words with this many letters.
    static fromText(text, length) {
        const words = text
            .split('\n')
            .map((line) => line.trim())
            .filter((word) => word.length === length && /^[a-z]+$/.test(word));
        return new WordList(words);
    }

    wordsStartingWith(start) {
        return this.wordsByStart.get(start) ?? [];
    }

    has(word) {
        return this.wordsStartingWith(word).includes(word);
    }
}
