# Word square solver

Given a size `n` and `n²` letters, this places the letters in an `n x n` grid so that every row is a valid English word and **row 1 is the same word as column 1, row 2 the same as column 2, and so on**.

```
$ node solve.js "4 eeeeddoonnnsssrv"
Input: 4 eeeeddoonnnsssrv
rose
oven
send
ends
```

## How to run it

Needs Node.js 20 or newer. There is nothing to install.

```bash
npm run dictionary   # one-off: downloads enable1.txt, the word list
npm run examples     # solves the four challenge puzzles
npm test             # runs the tests
```

Or solve your own puzzle: `node solve.js "4 aaccdeeeemmnnnoo"`. Several puzzles can be given in a file: `node solve.js --file puzzles.txt`.

If `npm run dictionary` cannot download the list, save <http://norvig.com/ngrams/enable1.txt> as `enable1.txt` in this folder.

## Example output

Running `npm run examples` on the four challenge puzzles (any valid square is accepted, so another run or word list could give different words):

```
Input: 4 aaccdeeeemmnnnoo
moan
once
acme
need

Input: 5 aaaeeeefhhmoonssrrrrttttw
feast
earth
armer
steno
throw

Input: 5 aabbeeeeeeeehmosrrrruttvv
heart
ember
above
revue
trees

Input: 7 aaaaaaaaabbeeeeeeedddddggmmlloooonnssssrrrruvvyyy
bravado
renamed
analogy
valuers
amoebas
degrade
odyssey
```

## How it works

Row 1 and column 1 are the same word, and so are row 2 and column 2, and so on. This means that each new row has to start with certain letters. For example, after `rose` and `oven`, the third row must start with `se`, because those are the third letters of the two rows above it.

The program uses this to fill the grid one row at a time:

1. Pick a word that starts with the letters the row needs, and that can be made from the letters not used yet.
2. Check ahead: each row still to come needs at least one word that could start the way it must. If one doesn't have any, skip this word.
3. If no word fits a row, go back to the row above and try a different word.

## The code

| File | Job |
| --- | --- |
| `src/WordList.js` | Holds the valid words of one length and finds words by their first letters |
| `src/WordSquare.js` | The square being built: a list of row words, with columns read from the rows (no 2D array) |
| `src/WordSquareSolver.js` | The search described above |
| `src/parsePuzzle.js` | Reads and checks an input line such as `4 eeeeddoonnnsssrv` |
| `solve.js` | The command line |
| `test/` | 9 short tests |
