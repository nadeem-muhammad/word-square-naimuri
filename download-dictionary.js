// Downloads the word list suggested in the brief and saves it as enable1.txt.
import { writeFileSync } from 'node:fs';

const response = await fetch('http://norvig.com/ngrams/enable1.txt');
if (!response.ok) {
    console.error(`Download failed (HTTP ${response.status}). Save http://norvig.com/ngrams/enable1.txt as enable1.txt by hand.`);
    process.exit(1);
}
writeFileSync('enable1.txt', await response.text());
console.log('Saved enable1.txt');
