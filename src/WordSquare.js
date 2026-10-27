// A word square being built. It is just a list of row words, for example ['rose', 'oven'].
// A column is worked out from the rows when we need it.
export class WordSquare {
    constructor(size, rows = []) {
        this.size = size;
        this.rows = rows;
    }

    // Returns a NEW square with one more row, so the old one is never changed.
    withRow(word) {
        return new WordSquare(this.size, [...this.rows, word]);
    }

    // Column 2 is the third letter of every row so far.
    column(index) {
        return this.rows.map((row) => row[index]).join('');
    }

    // Row 2 is the same word as column 2, so it has to start with whatever column 2 holds so far.
    startOfNextRow() {
        return this.column(this.rows.length);
    }

    // True when every row is the same word as its column.
    isValid() {
        return this.rows.length === this.size && this.rows.every((row, index) => row === this.column(index));
    }

    toString() {
        return this.rows.join('\n');
    }
}
