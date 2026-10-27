// Turns a line such as "4 eeeeddoonnnsssrv" into { size: 4, letters: "eeeeddoonnnsssrv" }.
export function parsePuzzle(line) {
    const match = /^\s*(\d+)\s+([A-Za-z]+)\s*$/.exec(line);
    if (match === null) {
        throw new Error(`Expected a size and some letters, like "4 eeeeddoonnnsssrv"`);
    }
    const size = Number(match[1]);
    const letters = match[2].toLowerCase();
    if (letters.length !== size * size) {
        throw new Error(`A ${size}x${size} square needs ${size * size} letters but got ${letters.length}`);
    }
    return { size, letters };
}
